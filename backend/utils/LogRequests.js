require("dotenv").config();

const { Deta } = require("deta");
const moment = require("moment");
const deta = Deta(process.env.DETA_KEY);
let db = deta.Base("proxpi");

const LogRequests = async (requests, key, resptime) => {
  const date = new Date();
  const ReqLogs = {
    url: requests.headers.origin,
    ip: requests.ip,
    resp_time: resptime,
    time: moment.utc(date).format("DD MMM YYYY hh:mm:ss"),
  };
  const ProxpiUpdates = {
    requests_log: db.util.append(ReqLogs),
  };
  await db.update(ProxpiUpdates, key);
};
module.exports = LogRequests;
