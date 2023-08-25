// impoort
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
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
      //  result.map(e)
      // let new_r = result.map((r) => ({
      //   ...r,
      //   CoverageStartDate: ConvertDateTimeFormat(r.CoverageStartDate),
      //   CoverageEndDate: ConvertDateTimeFormat(r.CoverageEndDate),

      // }));
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

// Listen server
app.listen(process.env.SERVER_PORT || 3002, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT || 3002}`);
  // console.log(`localhost:3002/read`);
});
