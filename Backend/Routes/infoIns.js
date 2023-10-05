const express = require("express");
const router = express.Router();
const db = require('../db');  
// const cors = require("cors");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

require("dotenv").config(); 

// const db = mysql.createConnection({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "1234",
//   database: process.env.DB_DATABASE || "chokdi",
//   port: process.env.DB_PORT || 3406,
// });


// db.connect((err) => {
//   if (err) {
//     console.log("Connecting error to my sql database", err);
//     return;
//   }
//   console.log("Connecting successfull");
// });


// Create Routes
router.post("/create", async (req, res) => {
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
router.get("/read", (req, res) => {
    const sql_command = "SELECT * FROM CustomerInsurance ;";
    try {
      db.query(sql_command, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        // console.log(result);
  
        return res.status(200).json(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  });
  
// Update data in the database
router.post("/edit/:VehicleNumber", async (req, res) => {
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
router.delete("/delete/:VehicleNumber", (req, res) => {
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
  
  
  
// router.use(bodyParser.json());
router.post("/check-duplicate", (req, res) => {
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
  


module.exports = router