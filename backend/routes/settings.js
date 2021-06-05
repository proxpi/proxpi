var express = require("express");
var app = express();
var crypto = require("crypto");
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

router.route("/settings").post(async (req, res) => {
  const updates = {
    access: req.body.body.accessP,
    body: req.body.body.bodyP,
    headers: req.body.body.headerP,
    params: req.body.body.paramsP,
    method: req.body.body.methodP,
  };
  const result = await db.update(updates, req.body.body.keyP);
  res.send(result);
});

router.route("/bannedsettings").post(async (req, res) => {
  const banUpdates = {
    blocked_ip: req.body.body.blockedipP,
    blocked_site: req.body.body.blockedsiteP,
  };
  const resultBan = await db.update(banUpdates, req.body.body.keyP);
  res.send(resultBan);
});

module.exports = router;
