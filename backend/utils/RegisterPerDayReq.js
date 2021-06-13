require("dotenv").config();
const { Map } = require("immutable");
const { Deta } = require("deta");
const deta = Deta(process.env.DETA_KEY);
let db = deta.Base("proxpi");
var moment = require("moment");
const RegisterPerDayRequests = async (key) => {
  time = moment().format("L");
  proxpidata = await db.get(key);
  daily_data = proxpidata["daily"];
  newDaily = Map(daily_data)
    .set(time, daily_data[time] + 1 || 1)
    .toObject();
  updates = {
    daily: newDaily,
  };
  await db.update(updates, key);
};
module.exports = RegisterPerDayRequests;
