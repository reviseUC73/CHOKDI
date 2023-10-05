const express = require("express");
const router = express.Router();


const { 
  read,
  create, 
  edit, 
  remove, 
  checkDuplicate
} = require('../Controllers/infoIns')
  
const db = require('../Models/db');  

// const cors = require("cors");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

require("dotenv").config(); 


// Create Routes
router.get('/read', read)
router.post('/create', create)
router.post('/edit/:VehicleNumber', edit)
router.delete('/delete/:VehicleNumber', remove)
router.post("/check-duplicate" , jsonParser, checkDuplicate);

module.exports = router