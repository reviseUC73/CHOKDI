const express = require("express");
const router = express.Router();

const {
  read,
  create,
  edit,
  remove,
  checkDuplicate,
} = require("../Controllers/infoIns");

// const cors = require("cors");
const bodyParser = require("body-parser");
const { authVerifyToken } = require("../Middleware/auth");
const jsonParser = bodyParser.json();

require("dotenv").config();

// Create Routes
router.get("/read", authVerifyToken, read);
router.post("/create", authVerifyToken, create);
router.post("/edit/:VehicleNumber", authVerifyToken, edit);
router.delete("/delete/:VehicleNumber", authVerifyToken, remove);
router.post("/check-duplicate", jsonParser, authVerifyToken, checkDuplicate);

module.exports = router;
