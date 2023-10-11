const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//import router
const dataRouter = require("./Routes/infoIns");
const authRouter = require("./Routes/auth");
const morgan = require("morgan");

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
// const bodyParser = require("body-parser");

require("dotenv").config(); // Load environment variables from .env file

// Initialize
const app = express();
app.use(morgan("dev")); // console log when server using any api
app.use(cors({ credentials: true, origin: "http://localhost:5173" })); // แก้ไขเป็น origin ที่คุณต้องการอนุญาต})); // Enable CORS for all routes / check policies when requesting routes
app.use(express.json()); // change json to javascript
app.use(cookieParser());

//use router
app.use("/infoIns", dataRouter); // use and set prefix path of Insurance
app.use("/auth", authRouter);

// Listen server
app.listen(process.env.SERVER_PORT || 3002, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT || 3002}`);
  // console.log(`localhost:3002/read`);
});
