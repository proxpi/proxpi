require("dotenv").config();
var requestIp = require("request-ip");
const { Deta } = require("deta");

const deta = Deta(process.env.DETA_KEY);
let db = deta.Base("proxpi");

const CheckAccess = async (req, res, next) => {
  key = req.url.split("/");
  x = await db.get(key[key.length - 1]);
  req.proxpidata = {
    header: x.headers,
    params: x.params,
    body: x.body,
  };

  if (x.access == "public") {
    next();
  } else if (x.access == "private") {
    if (x.privateUrl == req.headers.origin) {
      next();
    } else {
      res
        .status(401)
        .send({
          messgae:
            "The api you request is a Private API and This site doesnt have access to it.",
        });
    }
  } else {
    next();
  }

  next();
};

module.exports = CheckAccess;
