var express = require("express");
var app = express();
require("dotenv").config();
var router = require("express").Router();
const { Deta } = require("deta");
const deta = Deta(process.env.DETA_KEY);
let db = deta.Base("proxpi");
let dbAnalytics = deta.Base("analytics");
const cors = require("cors");
const bodyParser = require("body-parser");
app.set("trust proxy", true);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

router.route("/proxpi").post(async (req, res) => {
  const userProxpi = await db.fetch({ email: req.body.body.email }).next();
  res.send(userProxpi.value);
});
router.route("/proxpianalytics/:id").get(async (req, res) => {
  const ProxpiData = await db.get(req.params.id);
  const AnalyticsData = await dbAnalytics
    .fetch({ proxpikey: req.params.id })
    .next();

  if (req.user.aud[0] == ProxpiData.email) {
    res.json({ proxpidata: ProxpiData, analyticsdata: AnalyticsData.value });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;
