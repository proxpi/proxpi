var express = require("express");
var app = express();
var crypto = require("crypto");
require("dotenv").config();
var router = require("express").Router();
const { Deta } = require("deta");
const deta = Deta(process.env.DETA_KEY);
let db = deta.Base("proxpi");
let dbPlans = deta.Base("plans");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { encrypt } = require("../core/crypt");
app.use(cors());
const routeADD = require("../utils/GetUserEmail");

router.route("/create").post(async (req, res) => {
  const email = await routeADD(req);
  const plan = await dbPlans.fetch({ email: email }).next();
  const proxpi = await db.fetch({ email: email }).next();
 
  if (plan.value[0].plan == "Free" && proxpi.value.length <= 3) {
    const createdProxpi = await db.put({
      email: req.body.email,
      method: req.body.body.method,
      name: req.body.body.name + crypto.randomBytes(2).toString("hex"),
      url: req.body.body.url,
      access: req.body.body.access,
      privateUrl: "",
      header: encrypt(JSON.stringify({})),
      body: {},
      resp_time: [],
      data: {},
      params: {},
      site_access: [],
      blocked_site: [],
      blocked_ip: [],
      daily: {},
      geo: [],
      status: [],
      error_log: [],
      requests_log: [],
    });

    if (createdProxpi) {
      res.send({ statusb: true });
    } else {
      res.send({ status: false });
    }
  } else if (plan.value[0].plan == "Pro") {
    const createdProxpi = await db.put({
      email: req.body.email,
      method: req.body.body.method,
      name: req.body.body.name + crypto.randomBytes(2).toString("hex"),
      url: req.body.body.url,
      access: req.body.body.access,
      privateUrl: "",
      header: encrypt(JSON.stringify({})),
      body: {},
      resp_time: [],
      data: {},
      params: {},
      site_access: [],
      blocked_site: [],
      blocked_ip: [],
      daily: {},
      geo: [],
      status: [],
      error_log: [],
      requests_log: [],
    });

    if (createdProxpi) {
      res.send({ statusb: true });
    } else {
      res.send({ status: false });
    }
  } else {
    res.send({ status: false,message:"You have reached the maximum number of free ProxPi" });
  }
});

module.exports = router;
