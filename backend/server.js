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

var port = process.env.PORT || 8080;
app.use(cors());

app.use("/plan", jwtCheck, ErrorHandler, PlanRouter);
app.use("/new", jwtCheck, ErrorHandler, CreateRouter);
app.use("/get", jwtCheck, ErrorHandler, ProxPiRouter);
app.use("/update", jwtCheck, ErrorHandler, UpdateDataRouter);
app.use("/proxpi", ApiRouter);

app.listen(port, () => {
  console.log("ons");
});
