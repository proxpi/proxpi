require("dotenv").config();
var requestIp = require("request-ip");
const { Deta } = require("deta");

const deta = Deta(process.env.DETA_KEY);
let db = deta.Base("proxpi");

const CheckAccess = async (req, res, next) => {
  key = req.url.split("/");

  x = await db.get(key[key.length - 1]);
  req.proxpidata = x;

  if (x.access == "public") {
    if (
      !x.blocked_site.includes(req.headers.origin) ||
      !x.blocked_ip.includes(req.ip)
    ) {
      next();
    } else {
      return res.status(401).send({
        message: "LOL you are blocked from using this API",
      });
      res.end();
    }
  }
  if (x.access == "private") {
    if (x.privateUrl == req.headers.origin) {
      next();
    } else {
      return res.status(401).send({
        message:
          "The api you request is a Private API and This site doesnt have access to it.",
      });
      res.end();
    }
  } else {
    next();
  }

  next();
};

module.exports = CheckAccess;
