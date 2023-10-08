const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const {
  checkEmailUsed,
  googleRegister,
  listMail,
  login,
  register,
} = require("../Controllers/auth");
const {
  checkMailUsed_Middle,
  checkTokenG_Middle,
} = require("../Middleware/auth");

// use when user auth by oauth / check email of user has db ?
router.post("/check-email-used", jsonParser, checkEmailUsed);

router.post("/google-create-account", jsonParser, googleRegister);

router.get("/listMail", jsonParser, listMail);

router.post(
  "/register",
  jsonParser,
  checkTokenG_Middle,
  checkMailUsed_Middle,
  register
);
router.post(
  "/login",
  jsonParser,
  // checkTokenG_Middle,
  // checkMailUsed_Middle,
  login
);

module.exports = router;
