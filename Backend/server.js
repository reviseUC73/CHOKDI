const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
var bodyParser = require("body-parser");
// import axios from "axios";
const axios = require("axios");

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
// const bodyParser = require("body-parser");

require("dotenv").config(); // Load environment variables from .env file

// Initialize
const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // change json to javascript

// My sql connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_DATABASE || "chokdi",
  port: process.env.DB_PORT || 3406,
});
// Connecting to database
db.connect((err) => {
  if (err) {
    console.log("Connecting error to my sql database", err);
    return;
  }
  console.log("Connecting successfull");
});

// Create Routes
app.post("/create", async (req, res) => {
  const {
    CustomerName,
    CustomerAddress,
    Brand,
    Model,
    EngineCapacity,

    VehicleNumber,
    VehicleManufactureYear,
    VehicleBody,
    VehicleType,
    VehicleCode,

    InsuranceCompany,
    CoverageType,
    CoverageStartDate,
    CoverageEndDate,

    PolicyValue,
    Remark,
    Mail,
  } = req.body;
  try {
    db.query(
      "INSERT INTO CustomerInsurance ( CustomerName ,CustomerAddress , Brand , Model, EngineCapacity ,VehicleNumber ,VehicleManufactureYear ,VehicleBody,VehicleType ,VehicleCode ,InsuranceCompany ,CoverageType ,CoverageStartDate ,CoverageEndDate ,PolicyValue,Remark,Mail ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? )",
      [
        CustomerName,
        CustomerAddress,
        Brand,
        Model,
        EngineCapacity,

        VehicleNumber,
        VehicleManufactureYear,
        VehicleBody,
        VehicleType,
        VehicleCode,

        InsuranceCompany,
        CoverageType,
        CoverageStartDate,
        CoverageEndDate,

        PolicyValue,
        Remark,
        Mail,
      ],
      (err, result, fields) => {
        if (err) {
          console.log("Error inserting into database", err);
          res.body = "hi";
          return res.status(400).send({ result: " false" });
        }
        return res
          .status(201)
          .json({ message: "Inserting into database is successful" });
      }
    );
  } catch (err) {
    console.log("Error inserting into database", err);
    return res.status(500).send();
  }
});

// Read data from database
app.get("/read", (req, res) => {
  const sql_command = "SELECT * FROM CustomerInsurance ;";
  try {
    db.query(sql_command, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      console.log(result);

      return res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// Update data in the database
app.post("/edit/:VehicleNumber", async (req, res) => {
  const CustomerInsurance = req.params.VehicleNumber;
  const {
    CustomerName,
    CustomerAddress,
    Brand,
    Model,
    EngineCapacity,

    VehicleManufactureYear,
    VehicleBody,
    VehicleType,
    VehicleCode,

    InsuranceCompany,
    CoverageType,
    CoverageStartDate,
    CoverageEndDate,

    PolicyValue,
    Remark,
    Mail,
  } = req.body;

  try {
    db.query(
      "UPDATE CustomerInsurance SET  CustomerName = ?, CustomerAddress = ?, Brand = ?, Model = ?, EngineCapacity = ? ,VehicleManufactureYear = ?,VehicleBody = ?,VehicleType = ? ,VehicleCode = ?  ,InsuranceCompany = ?  ,CoverageType = ? ,CoverageStartDate  = ? ,CoverageEndDate = ?  ,PolicyValue = ? ,Remark = ? , Mail = ? WHERE VehicleNumber = ?",
      [
        CustomerName,
        CustomerAddress,
        Brand,
        Model,
        EngineCapacity,

        VehicleManufactureYear,
        VehicleBody,
        VehicleType,
        VehicleCode,

        InsuranceCompany,
        CoverageType,
        CoverageStartDate,
        CoverageEndDate,

        PolicyValue,
        Remark,
        Mail,
        CustomerInsurance,
      ],
      (err, result) => {
        if (err) {
          console.log("Error updating database", err);
          return res.status(400).send();
        }
        return res.status(200).json({
          message: "Updating database is successful",
          affectedRows: result.affectedRows,
        });
      }
    );
  } catch (err) {
    console.log("Error updating database", err);
    return res.status(500).send();
  }
});

// Delete data
app.delete("/delete/:VehicleNumber", (req, res) => {
  const VehicleNumber = req.params.VehicleNumber;

  try {
    db.query(
      "DELETE FROM CustomerInsurance WHERE VehicleNumber = ?",
      [VehicleNumber],
      (err, result) => {
        if (err) {
          console.log("Error deleting from database", err);
          return res.status(400).send();
        }
        return res.status(200).json({
          message: "Deleting from database is successful",
          affectedRows: result.affectedRows,
        });
      }
    );
  } catch (err) {
    console.log("Error deleting from database", err);
    return res.status(500).send();
  }
});

// app.use(bodyParser.json());
app.post("/check-duplicate", (req, res) => {
  // Retrieve the data from the request body
  const { VehicleNumber } = req.body;
  // console.log(AccountID, CustomerCode);
  const query = `SELECT * FROM CustomerInsurance WHERE VehicleNumber = ?`;

  db.query(query, [VehicleNumber], (err, result) => {
    if (err) {
      console.log("Failed to execute the duplicate data check query", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    // Check if any rows are returned from the query
    const duplicate = result.length > 0;

    // Return the result as JSON response
    res.json({ duplicate });
  });
});

// use when user auth by oauth / check email of user has db ?
app.post("/check-email-used", jsonParser, (req, res) => {
  const userData = req.body; // we use body-parser to get json from request's body (jsonParser)
  const { email } = userData; // email = userData.email -> we get string email from json and when you request to server you must send json(body) with key is email
  // const { mail } = userData; -> when  call api in body req you sent { mail : ....} in body reply
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
});

const G_TokenVerify = async (token) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
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

app.post("/google-register", jsonParser, async (req, res) => {
  const userData = req.body;
  const { Mail, Password, FirstName, LastName, Role, Token } = userData;
  const query = `INSERT INTO UserAccount (Mail, Password, FirstName, LastName, Role) VALUES (?,?,?,?,?)`;
  const isTokenValid = await G_TokenVerify(Token);
  if (!Boolean(isTokenValid)) {
    res
      .status(401)
      .json({
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
});
// POST /login gets urlencoded bodies
// app.post("/login", urlencodedParser, function (req, res) {
// const userData = req.body;
// res.json(userData);
// res.send( userData);
// res.json({ message: "Login success" });
// });

// Listen server
app.listen(process.env.SERVER_PORT || 3002, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT || 3002}`);
  // console.log(`localhost:3002/read`);
});
