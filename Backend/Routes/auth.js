const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const {
  checkEmailUsed,
  googleCreateAccount,
  listMail,
  login,
  register,
} = require("../Controllers/auth");

// use when user auth by oauth / check email of user has db ?
router.post("/check-email-used", jsonParser,checkEmailUsed);

router.post("/google-create-account", jsonParser , googleCreateAccount);

router.get("/listMail", jsonParser , listMail);



module.exports = router;
