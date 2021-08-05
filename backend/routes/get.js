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
const routeADD = require("../utils/GetUserEmail");

app.use(cors());

router.route("/proxpi").post(async (req, res) => {
  const userProxpi = await db.fetch({ email: req.body.body.email }).next();
  res.send(userProxpi.value);
});
router.route("/proxpianalytics/:id").get(async (req, res) => {
  try {
    let totalviews = 0;
    let totalreq = 0;
    let totalerr = 0;
    let resptimeavg = 0;
    let resptimetotal = 0;
    const ProxpiData = await db.get(req.params.id);

    //count total views
    Object.keys(ProxpiData.daily).map((data) => {
      totalviews += ProxpiData.daily[data] || 0;
    });

    //count total err req
    totalerr = ProxpiData.error_log.length || 0;

    //count total err req
    totalreq = ProxpiData.requests_log.length || 0;

    //get avg resp time
    ProxpiData.resp_time.map((data) => {
      resptimetotal += data.resp_time || 0;
    });
    resptimeavg = resptimetotal / ProxpiData.resp_time.length || 0;
    console.log(req.user)
   
    if (req.user['https://example.com/email'] == ProxpiData.email) {
      res.json({
        proxpidata: ProxpiData,
        subdata: {
          totalviews: totalviews,
          totalreq: totalreq,
          totalerr: totalerr,
          resptimeavg: resptimeavg,
        },
      });
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

    if (req.user['https://example.com/email'] == ProxpiData.email) {
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

    if (req.user['https://example.com/email'] == Blockdata.email) {
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

    if (req.user['https://example.com/email']== analyticsData.email) {
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

    if (req.user['https://example.com/email'] == reqLogData.email) {
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

    if (req.user['https://example.com/email'] == errLogData.email) {
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

    if (req.user['https://example.com/email'] == geoAnalyticsData.email) {
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
