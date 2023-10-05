const db = require("../Models/db.js");
const G_TokenVerify = async (token) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "routerlication/json",
          // value: "same-origin", // "same-origin-allow-popups"
        },
      }
    );
    console.log("response", "call api is successed");
    if (response.status === 200) {
      return response.data.email;
    }
    return null;
  } catch (err) {
    // console.log("Error in token decode", err);
    return false;
  }
};

// use when user auth by oauth / check email of user has db ?
exports.checkEmailUsed = async (req, res) => {
  const userData = req.body; // we use body-parser to get json from request's body (jsonParser)
  const { email } = userData; // email = userData.email -> we get string email from json and when you request to server you must send json(body) with key is email
  // const { mail } = userData; -> when  call api in body req you sent { mail : .... } in body reply
  // res.json(email);
  const query = `SELECT * FROM UserAccount WHERE Mail = ?`;
  db.query(query, [email], (err, result) => {
    if (err) {
      console.log("Failed to execute the check email query", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    const emailUsed = result.length > 0;
    res.json({ MailUsed: emailUsed });
    return;
  });
};

exports.googleCreateAccount = async (req, res) => {
  const userData = req.body;
  const { Mail, Password, FirstName, LastName, Role, Token } = userData;
  const query = `INSERT INTO UserAccount (Mail, Password, FirstName, LastName, Role) VALUES (?,?,?,?,?)`;
  const isTokenValid = await G_TokenVerify(Token);
  if (!Boolean(isTokenValid)) {
    res.status(401).json({
      error: "Invalid token > This token is not found or will expire.)",
    });
    return;
  }
  if (isTokenValid !== Mail) {
    res.status(401).json({ error: "Invalid token > This is not your token." });
    return;
  }
  db.query(
    query,
    [Mail, Password, FirstName, LastName, Role],
    (err, result) => {
      if (err) {
        console.log("Failed to execute the register query", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      console.log("result", result);
      res.json({
        message: "Register success",
        affectedRows: result.affectedRows,
      });
    }
  );
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

exports.login = async (req, res) => {
  const userData = req.body; // we use body-parser to get json from request's body (jsonParser)
};

exports.register = async (req, res) => {
  const userData = req.body; // we use body-parser to get json from request's body (jsonParser)
};
