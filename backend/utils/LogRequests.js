require("dotenv").config();
const { Map } = require("immutable");
const { Deta } = require("deta");

const deta = Deta(process.env.DETA_KEY);
let db = deta.Base("proxpi");

const LogRequests = async (requests, key, resptime) => {
  const ReqLogs = {
    url: requests.headers.origin,
    ip: requests.ip,
    resp_time: resptime,
  };
  const ProxpiUpdates = {
    requests_log: db.util.append(ReqLogs),
  };
  await db.update(ProxpiUpdates, key);
};
module.exports = LogRequests;
