var express = require("express");
var app = express();
require("dotenv").config();
var router = require("express").Router();
const { Deta } = require("deta");
const deta = Deta(process.env.DETA_KEY);
let db = deta.Base("proxpi");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

router.route("/proxpi").post(async (req, res) => {
  const userProxpi = await db.fetch({ email: req.body.body.email }).next();
  res.send(userProxpi.value);
});

module.exports = router;
