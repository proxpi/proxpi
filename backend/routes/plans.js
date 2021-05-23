var express = require("express");
var app = express();
require("dotenv").config();
var router = require("express").Router();
const { Deta } = require("deta");
const deta = Deta(process.env.DETA_KEY);
let db = deta.Base("plans");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

router.route("/check").post(async function (req, res) {
  x = (await db.fetch({ email: req.body.body.email }).next()).value[0];

  if (x == undefined) {
    res.send({ boolean: false, user: null });
  } else if (x.email == req.body.body.email) {
    res.send({ boolean: true, user: x });
  } else {
    res.send({ boolean: false, user: null });
  }
});

router.route("/activate").post(async (req, res) => {
  const itemAdded = await db.put({
    email: req.body.body.email,
    isActive: true,
    plan: "Free",
  });
  console.log(itemAdded);
  res.send(itemAdded);
});

module.exports = router;
