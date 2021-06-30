require("dotenv").config();
const { Deta } = require("deta");
const deta = Deta(process.env.DETA_KEY);
let db = deta.Base("proxpi");
const moment = require("moment");
const ErrorLogger = async (arg) => {
  const ErrLogs = {
    name: arg.name,
    requrl: arg.request_url,
    ip: arg.ip,
    Errtime: arg.time,
    ErrLog: arg.errLog,
  };
  const ErrUpdates = {
    error_log: db.util.append(ErrLogs),
  };
  await db.update(ErrUpdates, arg.key);
};
module.exports = ErrorLogger;
