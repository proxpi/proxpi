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

app.use(cors());
router.route("/api/:id").get(async (req, res) => {
  console.log(req.headers.origin);
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
            headers: x.header,
          })
          .then((data) => {
            return res.json(data.data);
          });
      } else {
        return res.status(401).send({
          message: "LOL you are blocked from using this API",
        });
      }
    }
    if (x.access == "private") {
      if (x.privateUrl == req.headers.origin) {
        axios
          .request({
            method: x.method,
            url: x.url,
            headers: x.header,
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
