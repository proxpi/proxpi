var express = require("express");
var app = express();

//Modules
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");

//routes
const PlanRouter = require("./routes/plans");
const CreateRouter = require("./routes/new");
const ProxPiRouter = require("./routes/get");
const UpdateDataRouter = require("./routes/settings");
const ApiRouter = require("./routes/api");

//Middleweres
const ErrorHandler = require("./middleware/ErrorHandler");
const jwtCheck = require("./middleware/CheckJWT");
const CheckAccess = require("./middleware/checkAccess");

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.enable("trust proxy");
app.use("/plan", jwtCheck, ErrorHandler, PlanRouter);
app.use("/new", jwtCheck, ErrorHandler, CreateRouter);
app.use("/get", jwtCheck, ErrorHandler, ProxPiRouter);
app.use("/update", jwtCheck, ErrorHandler, UpdateDataRouter);
app.use("/proxpi", ApiRouter);
app.get("/",(req,res)=>{
  res.status(200).send("Hi,This is server for ProxPi, please visit https://proxpi.tech")

})
app.listen(process.env.PORT || 8081, () => {
  console.log("Server is UP and Running");
});
