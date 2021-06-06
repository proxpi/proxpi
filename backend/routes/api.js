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

router.route("/api/:id").get((req, res) => {
  res.send(req.params.id);
});
router.route("/api/:id").post((req, res) => {
  res.send(req.params.id);
});
router.route("/api/:id").put((req, res) => {
  res.send(req.params.id);
});

router.route("/api/:id").delete((req, res) => {
  res.send(req.params.id);
});

module.exports = router;
