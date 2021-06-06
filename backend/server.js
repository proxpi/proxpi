var express = require("express");
var app = express();
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
const { Deta } = require("deta");
require("dotenv").config();
const deta = Deta(process.env.DETA_KEY);
let db = deta.Base("plans");
const cors = require("cors");
const PlanRouter = require("./routes/plans");
const CreateRouter = require("./routes/new");
const bodyParser = require("body-parser");
const ProxPiRouter = require("./routes/get");
const UpdateDataRouter = require("./routes/settings");
const ApiRouter = require("./routes/api");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
app.use(cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKS_URI,
  }),
  audience: process.env.AUDIENCE,
  issuer: process.env.ISSUER,
  algorithms: ["RS256"],
});
//app.use(jwtCheck);
app.use("/plan", jwtCheck, PlanRouter);
app.use("/new", jwtCheck, CreateRouter);
app.use("/get", jwtCheck, ProxPiRouter);
app.use("/update", jwtCheck, UpdateDataRouter);
app.use("/proxpi", ApiRouter);
app.listen(port, () => {
  console.log("ons");
});
