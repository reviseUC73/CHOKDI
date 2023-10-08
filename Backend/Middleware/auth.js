var jwt = require("jsonwebtoken");
const db = require("../Models/db.js");
// const bcrypt = require("bcryptjs");

const axios = require("axios");

exports.checkTokenG_MiddleV1 = async (req, res, next) => {
  const userData = req.body;
  const { Token } = userData;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${Token}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          Accept: "routerlication/json",
          value: "same-origin",
        },
      }
    );
    if (response.status === 200) {
      req.body.Mail = response.data.email;
      next();
      return;
    }

    return res.status(400).json({ message: "Token is invalid" });
  } catch (err) {
    console.log("Error in token decode", err);
    return res.status(400).json({ message: "Token is invalid" });
  }
};

exports.checkTokenG_Middle = async (req, res, next) => {
  const userData = req.body;
  const { Token, Mail } = userData;
  console.log(Token);
  try {
    const GToken = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${Token}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          Accept: "routerlication/json",
          value: "same-origin",
        },
      }
    );
    const token_mail = GToken.data.email;
    console.log("token_mail", token_mail);
    if (!Boolean(token_mail)) {
      res.status(401).json({
        token_status: "invalid",
        error: "Invalid token > This token is not found or will expire.)",
      });
      return;
    }
    if (token_mail !== Mail) {
      res.status(401).json({
        token_status: "invalid",
        error: "This is not your token.",
      });
      return;
    }
    if (GToken.status === 200) {
      next();
      console.log("vaild g token correct");
      return;
      //   return res.status(400).json({ message: "vaild g token correct" });
    }
    return res.status(400).json({ message: "some error" });
  } catch (err) {
    console.log("Error in token decode", err);
    return res.status(400).json({ message: "Error in token decode" });
  }
};

exports.checkMailUsed_Middle = async (req, res, next) => {
  const userData = req.body;
  console.log("userData", userData);
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
            message: "Internal server error",
          });
          return;
        }
        console.log(result);
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
        next();
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ resgis_status: "sql_command_fail" }).json;
  }
};

exports.authVerifyToken = async (req, res, next) => {
  try {
    const token_payload = req.headers["auth_token"]; // manage by fontend
    if (!token_payload) {
      return res.status(401).json({ message: "Token not found" });
    }
    const decoded = jwt.verify(token_payload, process.env.JWT_SECRET);
    console.log(decoded);
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Token Invalid" });
  }
};