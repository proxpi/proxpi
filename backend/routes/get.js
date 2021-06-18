var express = require("express");
var app = express();
require("dotenv").config();
var router = require("express").Router();
const { Deta } = require("deta");
const deta = Deta(process.env.DETA_KEY);
let db = deta.Base("proxpi");
const { decrypt } = require("../core/crypt");
const cors = require("cors");
const bodyParser = require("body-parser");
app.set("trust proxy", true);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const routeADD=require("../utils/GetUserEmail")

app.use(cors());

router.route("/proxpi").post(async (req, res) => {
  const userProxpi = await db.fetch({ email: req.body.body.email }).next();
  res.send(userProxpi.value);
});
router.route("/proxpianalytics/:id").get(async (req, res) => {
  try {
    const ProxpiData = await db.get(req.params.id);
    x=await routeADD(req)
    if (x == ProxpiData.email) {
      res.json({ proxpidata: ProxpiData });
    } else {
      res.json({ success: false });
    }
  } catch {
    res.json({ success: false });
  }
});
router.route("/proxpi/:id").get(async (req, res) => {
  try {
    const ProxpiData = await db.get(req.params.id);
    const datatosend = {
      headers: JSON.parse(decrypt(ProxpiData.header)) || {},
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
  } catch {
    res.json({ success: false });
  }
});

router.route("/blockers/:id").get(async (req, res) => {
  try {
    const Blockdata = await db.get(req.params.id);
    const databantosend = {
      blocked_ip: Blockdata.blocked_ip || [],
      key: Blockdata.key,
      blocked_site: Blockdata.blocked_site || [],
    };
    if (req.user.aud[0] == Blockdata.email) {
      res.json({ bandata: databantosend });
    } else {
      res.json({ success: false });
    }
  } catch {
    res.json({ success: false });
  }
});

router.route("/analytics/:id").get(async (req, res) => {
  try {
    const analyticsData = await db.get(req.params.id);
    const AnalyticsDataToSend = {
      analytics_daily: analyticsData.daily,
    };
    if (req.user.aud[0] == analyticsData.email) {
      res.json({ analyticsdata: AnalyticsDataToSend });
    } else {
      res.json({ success: false });
    }
  } catch {
    res.json({ success: false });
  }
});

router.route("/reqlog/:id").get(async (req, res) => {
  try {
    const reqLogData = await db.get(req.params.id);
    const ReqLogDataToSend = {
      requestlogs: reqLogData.requests_log,
    };
    if (req.user.aud[0] == reqLogData.email) {
      res.json({ reqlog: ReqLogDataToSend });
    } else {
      res.json({ success: false });
    }
  } catch {
    res.json({ success: false });
  }
});

router.route("/errlog/:id").get(async (req, res) => {
  try {
    const errLogData = await db.get(req.params.id);
    const errLogDataToSend = {
      errlogs: errLogData.error_log,
    };
    if (req.user.aud[0] == errLogData.email) {
      res.json({ errlog: errLogDataToSend });
    } else {
      res.json({ success: false });
    }
  } catch {
    res.json({ success: false });
  }
});
router.route("/geoanalytics/:id").get(async (req, res) => {
  try {
    const geoAnalyticsData = await db.get(req.params.id);
    const geoAnalyticsDataToSend = {
      geoData: geoAnalyticsData.geo,
    };
    if (req.user.aud[0] == geoAnalyticsData.email) {
      res.json({ geoAnalytics: geoAnalyticsDataToSend });
    } else {
      res.json({ success: false });
    }
  } catch {
    res.json({ success: false });
  }
});

router.route("/resptime/:id").get(async (req, res) => {
  try {
    const respTimeData = await db.get(req.params.id);
    const respTimeDataToSend = {
      resp_time_data: respTimeData.resp_time,
    };
    if (req.user.aud[0] == respTimeData.email) {
      res.json({ respTime: respTimeDataToSend });
    } else {
      res.json({ success: false });
    }
  } catch {
    res.json({ success: false });
  }
});

module.exports = router;
