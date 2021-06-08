var express = require("express");
var app = express();
require("dotenv").config();
var router = require("express").Router();
const { Deta } = require("deta");
const deta = Deta(process.env.DETA_KEY);
let db = deta.Base("proxpi");

const cors = require("cors");
const bodyParser = require("body-parser");
app.set("trust proxy", true);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

router.route("/proxpi").post(async (req, res) => {
  const userProxpi = await db.fetch({ email: req.user.aud[0] }).next();
  res.send(userProxpi.value);
});
router.route("/proxpianalytics/:id").get(async (req, res) => {
  const ProxpiData = await db.get(req.params.id);

  if (req.user.aud[0] == ProxpiData.email) {
    res.json({ proxpidata: ProxpiData });
  } else {
    res.json({ success: false });
  }
});
router.route("/proxpi/:id").get(async (req, res) => {
  const ProxpiData = await db.get(req.params.id);
  const datatosend = {
    headers: ProxpiData.header,
    params: ProxpiData.params,
    body: ProxpiData.body,
    access: ProxpiData.access,
    method: ProxpiData.method,
    key: ProxpiData.key,
    privateUrl: ProxpiData.privateUrl,
  };
  if (req.user.aud[0] == ProxpiData.email) {
    res.json({ proxpidata: datatosend });
  } else {
    res.json({ success: false });
  }
});

router.route("/blockers/:id").get(async (req, res) => {
  const Blockdata = await db.get(req.params.id);
  const databantosend = {
    blocked_ip: Blockdata.blocked_ip,
    key: Blockdata.key,
    blocked_site: Blockdata.blocked_site,
  };
  if (req.user.aud[0] == Blockdata.email) {
    res.json({ bandata: databantosend });
  } else {
    res.json({ success: false });
  }
});
module.exports = router;
