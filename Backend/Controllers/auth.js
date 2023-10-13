const db = require("../Config/db.js");
const bcrypt = require("bcryptjs");
const axios = require("axios");

var jwt = require("jsonwebtoken");

require("dotenv").config(); // Load environment variables from .env file

// const { token } = require("morgan");

const G_TokenVerify = async (token) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "routerlication/json",
          value: "same-origin", // "same-origin-allow-popups"
        },
      }
    );

    // console.log(response.data.Mail, "call api is successed");
    // console.log("response", "call api is successed");
    if (response.status === 200) {
      return response.data.Mail;
    }

    return null;
  } catch (err) {
    console.log("Error in token decode", err);
    return false;
  }
};

// use when user auth by oauth / check Mail of user has db ?
exports.checkEmailUsed_1 = async (req, res) => {
  const userData = req.body; // we use body-parser to get json from request's body (jsonParser)
  const { Mail } = userData; // Mail = userData.Mail -> we get string Mail from json and when you request to server you must send json(body) with key is Mail
  const query = `SELECT * FROM UserAccount WHERE Mail = ?`;
  db.query(query, [Mail], (err, result) => {
    if (err) {
      console.log("Failed to execute the check Mail query", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    const emailUsed = result.length > 0;

    console.log("emailUsed", result);
    res.json({ MailUsed: emailUsed, message: `can use this ${Mail}` });
    return;
  });
};

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
    // return res.status(500).json({ error: err.message });
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
    // return res.status(500).json({ error: err.message });
    return res.status(500).send({ ReferenceError: err.message });
  }
};

//change in payload token -> Gtoken

//regis-status = invalid , mail_used, success
exports.registerAll = async (req, res) => {
  const userData = req.body;
  var { Mail, Password, FirstName, LastName, Role, Token } = userData;
  const isGtokenValid = await G_TokenVerify(Token);

  if (!Boolean(isGtokenValid)) {
    res.status(401).json({
      regis_status: "invalid",
      error: "Invalid token > This token is not found or will expire.)",
    });
    return;
  }
  if (isGtokenValid !== Mail) {
    res.status(401).json({
      regis_status: "invalid",
      error: "Invalid token > This is not your token.",
    });
    return;
  }

  // now this google account is enabled by admin(this account can use (google mail that enables to access ))
  try {
    const query_insert = `INSERT INTO UserAccount (Mail, Password, FirstName, LastName, Role) VALUES (?,?,?,?,?)`;
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

    // Encrypt
    const hashedPassword = await bcrypt.hash(Password, 10);
    console.log("query_insert");

    db.query(
      query_insert,
      [Mail, hashedPassword, FirstName, LastName, Role],
      (err, result) => {
        if (err) {
          console.log("Failed to execute the register query", err);
          res.status(500).json({
            regis_status: "invalid",
            error: "Internal server error",
          });
          return;
        }

        res.status(201).json({
          regis_status: "success",
          affectedRows: result.affectedRows,
          message: "User account created successfully.",
        });
      }
    );
  } catch (e) {
    console.log(e.message);
    res.status(401).json({ resgis_status: "sql_command_fail" }).json;
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
        const tokenPayload = { Mail: Mail, Role: "User" };
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
            // console.log("1 token", token);
            // Define Max Age
            const threeDays = 3 * 24 * 60 * 60 * 1000; // Ensure this value is correct for your use case

            // Send Response
            res
              .status(201)
              .cookie("authToken", token, {
                // httpOnly: true,
                maxAge: threeDays,
                // secure: true,
                // sameSite: 'None',
              })
              .json({
                affectedRows: result.affectedRows,
                message: "User account created successfully.",
                token,
                user: {
                  Mail,
                  FirstName,
                  LastName,
                  Role,
                },
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
  const { Mail, password } = req.body;

  // const [result] = await db.query
  try {
    db.query(
      "SELECT * FROM UserAccount WHERE Mail = ?",
      [Mail],
      async (err, result) => {
        if (err) {
          res.status(400).json({ error: " Sql_commnad_fail" });
        } else {
          // res.status(200).json(result);

          // console.log(result);
          // Check Mail in system -> Mail and password are correct -> send token to client
          if (result.length === 0) {
            res.status(401).json({ error: "Email not found" });
            return;
          }
          var user = result[0];
          // console.log(user);
          const isPasswordMatched = await bcrypt.compare(
            password,
            user.Password
          );
          if (!isPasswordMatched) {
            res.status(401).json({ error: "Password is incorrect" });
            return;
          }

          // user.Password = password; // sent data of user that pass word is not encrypted
          // const token = jwt.sign({ Mail: user.Mail }, process.env.JWT_SECRET, {
          const threeDays = 3 * 24 * 60 * 60 * 1000;
          jwt.sign(
            { Mail: Mail, Role: user.Role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" },
            (err, token) => {
              if (err) {
                res.status(500).json({ error: "Internal server error" });
                // throw err;
                console.log(err);
                return;
              }

              res
                .status(200)
                .cookie("authToken", token, {
                  // httpOnly: true,
                  maxAge: threeDays,
                  secure: true,
                  // sameSite: none,
                }) // set cookie; // sent to fontend and add it to header
                .json({ message: "Login success", token, user });
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
                  // secure: true,
                  // sameSite: none,
                }) // set cookie; // sent to fontend and add it to header
                .json({ message: "Login success", token, user });
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
