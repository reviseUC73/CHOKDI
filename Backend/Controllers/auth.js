const db = require("../Config/db.js");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

require("dotenv").config(); // Load environment variables from .env file

const isProduction = process.env.NODE_ENV === 'production'; // development

exports.checkEmailUsed = async (req, res) => {
  const userData = req.body;
  const { Mail } = userData;
  try {
    db.query(
      `SELECT Mail FROM UserAccount WHERE Mail = ?`,
      [Mail],
      (err, result) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({
            regis_status: "invalid",
          });
          return;
        }
        // console.log(result);
        var mailUsed = result.length > 0;
        if (mailUsed) {
          res
            .status(409) // Conflict
            .json({
              message:
                "Username/Email already exists. Please choose a different one.",
              resgis_status: "mail_used",
              MailUsed: mailUsed,
            });
          return;
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send({ ReferenceError: err.message });
  }
};

exports.listMail = async (req, res) => {
  const sql_command = "SELECT Mail FROM UserAccount;";
  try {
    db.query(sql_command, (err, result) => {
      if (err) {
        res.status(400).json({ error: " list_user_q_error" });
      } else {
        res.status(200).json(result);
      }
      return;
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ ReferenceError: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const userData = req.body;
    var { Mail, Password, FirstName, LastName, Role } = userData;

    // Encrypt
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Insert User
    const query = `INSERT INTO UserAccount (Mail, Password, FirstName, LastName, Role) VALUES (?,?,?,?,?)`;
    db.query(
      query,
      [Mail, hashedPassword, FirstName, LastName, Role],
      (err, result) => {
        if (err) {
          console.error("Failed to execute the register query", err);
          return res.status(500).json({
            regis_status: "invalid",
            error: "Internal server error",
          });
        }

        // Generate JWT
        // const tokenPayload = { Mail: result.Mail, Role: result.Role };

        jwt.sign(
          { Mail: Mail, Role: "User" },
          process.env.JWT_SECRET,
          { expiresIn: "3d" },
          (err, token) => {
            if (err) {
              console.error("Failed to generate token", err);
              return res
                .status(500)
                .json({ error: "Internal server error (Generate Token Fail)" });
            }

            // Define Max Age
            const threeDays = 3 * 24 * 60 * 60 * 1000; // Ensure this value is correct for your use case

            // Send Response
            res
              .status(201)
              .cookie("authToken", token, {
                httpOnly: true, // Frontend can access or read this cookie value. -> ป้องกันไม่ให้ JavaScript ฝั่ง Frontend (XSS) เข้าถึง Cookie ได้
                maxAge: threeDays,
                secure: isProduction, // true/false บังคับส่งผ่าน HTTPS/HTTP (ทั้ง Render และ Vercel เป็น HTTPS อยู่แล้ว จึงใช้ได้)
                path: '/', // ทำให้ cookie ใช้ได้กับทุก path ใน domain
                sameSite: isProduction ? 'None' : 'Lax',
                // sameSite - ป้องกันการโจมตีแบบ CSRF โดยกำหนดว่า Browser จะยอมส่ง Cookie นี้ไปกับ Request ข้ามโดเมน (Cross-Site) หรือไม่ :
                  // - 'lax'    : (ค่าเริ่มต้น) ป้องกันการยิง API ข้ามโดเมน แต่อนุโลมให้ส่ง Cookie ได้เมื่อผู้ใช้คลิกลิงก์เปลี่ยนหน้าเว็บเข้ามา
                  // - 'strict' : ปลอดภัยสูงสุด อนุญาตให้ส่ง Cookie เฉพาะตอนที่ผู้ใช้อยู่บนโดเมนเดียวกันเป๊ะๆ เท่านั้น
                  // - 'none'   : ยอมให้ Browser ส่ง Cookie แนบไปกับทุก Request (รวมถึง API ข้ามโดเมน) **บังคับใช้คู่กับ secure: true เสมอ**
              })
              .json({
                affectedRows: result.affectedRows,
                message: "User account created successfully.",
              });
          }
        );
      }
    );
  } catch (error) {
    console.error("Unexpected error", error);
    return res.status(500).json({ error: "Unexpected server error" });
  }
};

// use jwt token when user login (optional -> het token when user register)
// sent token in cookie of brower domain api and
exports.login = async (req, res) => {
  const { Mail, Password } = req.body;
  try {
    db.query(
      "SELECT * FROM UserAccount WHERE Mail = ?",
      [Mail],
      async (err, result) => {
        if (err) {
          res.status(400).json({ error: " Sql_commnad_fail" });
        } else {
          if (result.length === 0) {
            res.status(401).json({ message: "Email not found" });
            return;
          }
          var user = result[0];
          const isPasswordMatched = await bcrypt.compare(
            Password,
            user.Password
          );
          if (!isPasswordMatched) {
            res.status(401).json({ message: "Password is incorrect" });
            return;
          }

          const threeDays = 3 * 24 * 60 * 60 * 1000;
          jwt.sign(
            { Mail: Mail, Role: user.Role },
            process.env.JWT_SECRET,
            { expiresIn: "3d" },
            (err, token) => {
              if (err) {
                res.status(500).json({ error: "Internal server error" });
                // throw err;
                console.log(err);
                return;
              }

              res
                .status(201)
                .cookie("authToken", token, {
                httpOnly: true, // Frontend can access or read this cookie value. -> ป้องกันไม่ให้ JavaScript ฝั่ง Frontend (XSS) เข้าถึง Cookie ได้
                maxAge: threeDays,
                secure: isProduction, // true/false บังคับส่งผ่าน HTTPS/HTTP (ทั้ง Render และ Vercel เป็น HTTPS อยู่แล้ว จึงใช้ได้)
                path: '/', // ทำให้ cookie ใช้ได้กับทุก path ใน domain
                sameSite: isProduction ? 'None' : 'Lax',
                // sameSite - ป้องกันการโจมตีแบบ CSRF โดยกำหนดว่า Browser จะยอมส่ง Cookie นี้ไปกับ Request ข้ามโดเมน (Cross-Site) หรือไม่ :
                  // - 'lax'    : (ค่าเริ่มต้น) ป้องกันการยิง API ข้ามโดเมน แต่อนุโลมให้ส่ง Cookie ได้เมื่อผู้ใช้คลิกลิงก์เปลี่ยนหน้าเว็บเข้ามา
                  // - 'strict' : ปลอดภัยสูงสุด อนุญาตให้ส่ง Cookie เฉพาะตอนที่ผู้ใช้อยู่บนโดเมนเดียวกันเป๊ะๆ เท่านั้น
                  // - 'none'   : ยอมให้ Browser ส่ง Cookie แนบไปกับทุก Request (รวมถึง API ข้ามโดเมน) **บังคับใช้คู่กับ secure: true เสมอ**
                })
                .json({ message: "Login success" });
            }
          );
        }
        return;
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error (1)" });
  }
};

// check Mail and google token
exports.login_google = async (req, res) => {
  const { Mail } = req.body;

  // const [result] = await db.query
  try {
    db.query(
      "SELECT * FROM UserAccount WHERE Mail = ?",
      [Mail],
      async (err, result) => {
        
        if (err) {
          console.log(err)
          res.status(400).json({ error: " Sql_commnad_fail" , message:err });
        } else {
          if (result.length === 0) {
            console.log("Email not found");
            res.status(401).json({ error: "Email not found" });

            return;
          }
          // have mail in db
          var user = result[0];
          const threeDays = 3 * 24 * 60 * 60 * 1000;
          
          jwt.sign(
            { Mail: Mail, Role: user.Role },
            process.env.JWT_SECRET,
            { expiresIn: "3d" },
            (err, token) => {
              if (err) {
                res.status(500).json({ error: "Internal server error" });
                console.log(err);
                return;
              }
              res
                .status(201)
                .cookie("authToken", token, {                  
                httpOnly: true, // Frontend can access or read this cookie value. -> ป้องกันไม่ให้ JavaScript ฝั่ง Frontend (XSS) เข้าถึง Cookie ได้
                maxAge: threeDays,
                secure: isProduction, // true/false บังคับส่งผ่าน HTTPS/HTTP (ทั้ง Render และ Vercel เป็น HTTPS อยู่แล้ว จึงใช้ได้)
                path: '/', // ทำให้ cookie ใช้ได้กับทุก path ใน domain
                sameSite: isProduction ? 'None' : 'Lax',
                // sameSite - ป้องกันการโจมตีแบบ CSRF โดยกำหนดว่า Browser จะยอมส่ง Cookie นี้ไปกับ Request ข้ามโดเมน (Cross-Site) หรือไม่ :
                  // - 'lax'    : (ค่าเริ่มต้น) ป้องกันการยิง API ข้ามโดเมน แต่อนุโลมให้ส่ง Cookie ได้เมื่อผู้ใช้คลิกลิงก์เปลี่ยนหน้าเว็บเข้ามา
                  // - 'strict' : ปลอดภัยสูงสุด อนุญาตให้ส่ง Cookie เฉพาะตอนที่ผู้ใช้อยู่บนโดเมนเดียวกันเป๊ะๆ เท่านั้น
                  // - 'none'   : ยอมให้ Browser ส่ง Cookie แนบไปกับทุก Request (รวมถึง API ข้ามโดเมน) **บังคับใช้คู่กับ secure: true เสมอ**
                })
                .json({ message: "Login success" });
            }
          );
        }
        return;
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error (1)" });
  }
};

exports.checkAuth = async (req, res) => {
  // Middleware `verifyCookieToken` ได้ทำการตรวจสอบ token ใน cookie ให้แล้ว
  // ถ้ามาถึงตรงนี้ได้ แสดงว่า token ถูกต้อง
  // เราจะ decode token อีกครั้งเพื่อส่งข้อมูล user กลับไปให้ frontend
  try {
    const token = req.cookies.authToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      Mail: decoded.Mail,
      Role: decoded.Role,
    });
  } catch (err) {
    // โดยปกติจะไม่เกิด error นี้ถ้า middleware ทำงานถูกต้อง
    res.status(401).json({ message: "Invalid session" });
  }
};

exports.logout = (req, res) => {
  // ในการ logout เราจะล้าง httpOnly cookie โดยการตั้งให้ cookie หมดอายุ
  res.cookie("authToken", "", {
    httpOnly: true,
    expires: new Date(0), // ตั้งวันหมดอายุเป็นอดีต
    path: '/', // สำคัญมาก: ต้องระบุ path ให้ตรงกับตอนที่ตั้งค่า cookie
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
  }).status(200).json({ message: "Logout successful" });
};
