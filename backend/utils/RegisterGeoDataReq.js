require("dotenv").config();
const { default: axios } = require("axios");
const { Deta } = require("deta");
const deta = Deta(process.env.DETA_KEY);
let db = deta.Base("proxpi");

const RegisterGeoDataReq = async (key, ip) => {
  try {
    axios
      .get(`https://ipgeolocatorproxpi.herokuapp.com/api/geolocate/${ip}`)
      .then(async (data) => {
        x=[]
        x.push(Object.values(data.data))
        updates = {
          geo: db.util.append(x),
        };
        await db.update(updates, key);
      });
  } catch {}
};
module.exports = RegisterGeoDataReq;
