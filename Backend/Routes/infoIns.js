const express = require("express");
const router = express.Router();

const {
  read,
  create,
  edit,
  remove,
  checkDuplicate,
  getByEmail,
} = require("../Controllers/infoIns");

const bodyParser = require("body-parser");
const { verifyCookieToken, verifiedPermissionsUser, verifyRoleAdmin } = require("../Middleware/auth");
const jsonParser = bodyParser.json();

require("dotenv").config();

// Create Routes
router.post("/create", verifyCookieToken, verifyRoleAdmin,create);
router.post("/edit/:VehicleNumber", verifyCookieToken,verifyRoleAdmin, edit);
router.delete("/delete/:VehicleNumber", verifyCookieToken,verifyRoleAdmin, remove);
router.post("/check-duplicate", jsonParser, verifyCookieToken,verifyRoleAdmin, checkDuplicate);
router.get("/read", verifyCookieToken, verifyRoleAdmin ,read);

router.get("/getDataByEmail/:Mail", verifyCookieToken,verifiedPermissionsUser, getByEmail);

module.exports = router;
