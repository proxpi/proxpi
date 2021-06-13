var express = require("express");
var app = express();
var crypto = require("crypto");
require("dotenv").config();
var router = require("express").Router();
const { Deta } = require("deta");
const deta = Deta(process.env.DETA_KEY);
let db = deta.Base("proxpi");
const axios = require("axios");
app.enable("trust proxy");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const { decrypt } = require("../core/crypt");
const RegisterPerDayRequests = require("../utils/RegisterPerDayReq");
const RegisterResponeTime = require("../utils/RegisterResponseTime");
const RegisterGeoDataReq = require("../utils/RegisterGeoDataReq");
app.use(cors());
router.route("/api/:id").get(async (req, res) => {
  try {
    const date = new Date();
    x = await db.get(req.params.id);
    if (x.access == "public") {
      if (
        !(
          x.blocked_site.includes(req.headers.origin) ||
          x.blocked_ip.includes(req.ip)
        )
      ) {
        axios
          .request({
            method: x.method,
            url: x.url,
            headers: JSON.parse(decrypt(x.header)),
          })
          .then((data) => {
            return res.json(data.data);
          })
          .catch((err) => {
            return res.status(404).send(err);
          });
      } else {
        return res.status(401).send({
          message: "LOL you are blocked from using this API",
        });
      }
    }
    if (x.access == "private") {
      console.log(req.headers.origin, x.privateUrl);
      if (x.privateUrl == req.headers.origin) {
        axios
          .request({
            method: x.method,
            url: x.url,
            headers: JSON.parse(decrypt(x.header)),
          })
          .then((data) => {
            return res.json(data.data);
          });
      } else {
        return res.status(401).send({
          message:
            "The api you request is a Private API and This site doesnt have access to it.",
        });
      }
    }

    RegisterResponeTime(new Date() - date, (key = req.params.id));
    RegisterPerDayRequests((key = req.params.id));
    RegisterGeoDataReq((key = req.params.id), (ip = req.ip));
  } catch {
    return res.status(404).send({ error: "No API exists" });
  }
});
router.route("/api/:id").post(async (req, res) => {
  try {
    x = await db.get(req.params.id);
    if (x.access == "public") {
      if (
        !(
          x.blocked_site.includes(req.headers.origin) ||
          x.blocked_ip.includes(req.ip)
        )
      ) {
        axios
          .request({
            method: x.method,
            url: x.url,
            headers: JSON.parse(decrypt(x.header)),
          })
          .then((data) => {
            return res.json(data.data);
          })
          .catch((err) => {
            return res.status(404).send(err);
          });
      } else {
        return res.status(401).send({
          message: "LOL you are blocked from using this API",
        });
      }
    }
    if (x.access == "private") {
      console.log(req.headers.origin, x.privateUrl);
      if (x.privateUrl == req.headers.origin) {
        axios
          .request({
            method: x.method,
            url: x.url,
            headers: JSON.parse(decrypt(x.header)),
          })
          .then((data) => {
            return res.json(data.data);
          });
      } else {
        return res.status(401).send({
          message:
            "The api you request is a Private API and This site doesnt have access to it.",
        });
      }
    }
  } catch {
    return res.status(404).send({ error: "No API exists" });
  }
});
router.route("/api/:id").put(async (req, res) => {
  try {
    x = await db.get(req.params.id);
    if (x.access == "public") {
      if (
        !(
          x.blocked_site.includes(req.headers.origin) ||
          x.blocked_ip.includes(req.ip)
        )
      ) {
        axios
          .request({
            method: x.method,
            url: x.url,
            headers: JSON.parse(decrypt(x.header)),
          })
          .then((data) => {
            return res.json(data.data);
          })
          .catch((err) => {
            return res.status(404).send(err);
          });
      } else {
        return res.status(401).send({
          message: "LOL you are blocked from using this API",
        });
      }
    }
    if (x.access == "private") {
      console.log(req.headers.origin, x.privateUrl);
      if (x.privateUrl == req.headers.origin) {
        axios
          .request({
            method: x.method,
            url: x.url,
            headers: JSON.parse(decrypt(x.header)),
          })
          .then((data) => {
            return res.json(data.data);
          });
      } else {
        return res.status(401).send({
          message:
            "The api you request is a Private API and This site doesnt have access to it.",
        });
      }
    }
  } catch {
    return res.status(404).send({ error: "No API exists" });
  }
});

router.route("/api/:id").delete(async (req, res) => {
  try {
    x = await db.get(req.params.id);
    if (x.access == "public") {
      if (
        !(
          x.blocked_site.includes(req.headers.origin) ||
          x.blocked_ip.includes(req.ip)
        )
      ) {
        axios
          .request({
            method: x.method,
            url: x.url,
            headers: JSON.parse(decrypt(x.header)),
          })
          .then((data) => {
            return res.json(data.data);
          })
          .catch((err) => {
            return res.status(404).send(err);
          });
      } else {
        return res.status(401).send({
          message: "LOL you are blocked from using this API",
        });
      }
    }
    if (x.access == "private") {
      console.log(req.headers.origin, x.privateUrl);
      if (x.privateUrl == req.headers.origin) {
        axios
          .request({
            method: x.method,
            url: x.url,
            headers: JSON.parse(decrypt(x.header)),
          })
          .then((data) => {
            return res.json(data.data);
          });
      } else {
        return res.status(401).send({
          message:
            "The api you request is a Private API and This site doesnt have access to it.",
        });
      }
    }
  } catch {
    return res.status(404).send({ error: "No API exists" });
  }
});

module.exports = router;
