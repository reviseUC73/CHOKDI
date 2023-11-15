const db = require("../Config/db.js");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env file

// use when user auth by oauth / check Mail of user has db ?

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
        const tokenPayload = { Mail: result.Mail, Role: result.Role };
        jwt.sign(
          tokenPayload,
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
                // httpOnly: true,
                maxAge: threeDays,
                secure: false, // Ensure this is true if you are using HTTPS
                // sameSite: 'None',
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
                  // httpOnly: true,
                  maxAge: threeDays,
                  secure: false, // Ensure this is true if you are using HTTPS
                  // sameSite: none,
                }) // set cookie; // sent to fontend and add it to header
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
          res.status(400).json({ error: " Sql_commnad_fail" });
        } else {
          if (result.length === 0) {
            console.log("Email not found");
            res.status(401).json({ error: "Email not found" });
            //-> con create new user
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
                  // httpOnly: true,
                  maxAge: threeDays,
                  secure: false, // Ensure this is true if you are using HTTPS
                  // sameSite: none,
                }) // set cookie; // sent to fontend and add it to header
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
