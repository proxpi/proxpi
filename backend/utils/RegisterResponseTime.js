require("dotenv").config();
const { Deta } = require("deta");
const deta = Deta(process.env.DETA_KEY);
let db = deta.Base("proxpi");
const moment = require("moment");
const RegisterResponeTime = async (time, key) => {
  const data = {
    time: moment().format("LLL"),
    resp_time: time,
  };
  const updates = {
    resp_time: db.util.append(data),
  };
  await db.update(updates, key);
};
module.exports = RegisterResponeTime;
