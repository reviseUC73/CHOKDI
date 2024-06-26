const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//import router
const dataRouter = require("./Routes/infoIns");
const authRouter = require("./Routes/auth");
const morgan = require("morgan");
const db = require("./Config/db");

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
// const bodyParser = require("body-parser");

require("dotenv").config(); // Load environment variables from .env file

// Initialize
const app = express();
app.use(morgan("dev")); // console log when server using any api
app.use(cors({ credentials: true, origin: process.env.ALLOW_REQUEST_IP }));
app.use(express.json()); // change json to javascript
app.use(cookieParser());

//use router
app.use("/infoIns", dataRouter); // use and set prefix path of Insurance
app.use("/auth", authRouter);
// Health Check Endpoint
app.get('/healthcheck', (req, res) => {
  db.ping((err) => {
      if (err) {
          console.error('Database ping failed:', err);
          res.status(500).json({ status: 'fail', db_status: 'unreachable' });
      } else {
          res.json({ status: 'success', db_status: 'healthy' });
      }
  });
});
// Listen server
// http://localhost:5004/healthcheck
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
