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
const { verifyCookieToken } = require("../Middleware/auth");
// const { authVerifyToken } = require("../Middleware/auth");
// verifyCookieToken
const jsonParser = bodyParser.json();

require("dotenv").config();

// Create Routes
router.post("/create", verifyCookieToken, create);
router.post("/edit/:VehicleNumber", verifyCookieToken, edit);
router.delete("/delete/:VehicleNumber", verifyCookieToken, remove);
router.post("/check-duplicate", jsonParser, verifyCookieToken, checkDuplicate);
router.get("/read", verifyCookieToken, read);

module.exports = router;
