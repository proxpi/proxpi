import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Icon, Tooltip } from "@auth0/cosmos";
import "../../assets/logger.css";
import "../../assets/scroller.css";
import "../../assets/home.css";
function RequestLogger() {
  const { getAccessTokenSilently } = useAuth0();
  const [ReqLog, setReqLog] = useState();
  const [l, sl] = useState(false);
  async function getReqLog() {
    const tokenGPARL = await getAccessTokenSilently();
    //GPA means Get Proxpi analytics Request Log
    await axios
      .request({
        method: "GET",
        url: `/get/reqlog/${window.location.pathname.split("/")[3]}`,
        headers: {
          Authorization: `Bearer ${tokenGPARL}`,
        },
      })
      .then((data) => {
        if (!data.data.success == false) {
        } else {
          setReqLog(data.data.reqlog.requestlogs);
          sl(true);
        }
      });
  }
  useEffect(() => {
    getReqLog();
  }, []);
  if (l) {
    return (
      <div
        class="mainbody nmorphism-container tab-scroller"
        style={{ overflow: "scroll" }}
      >
        <div
          class="tab-scroller"
          style={{ display: "flex", flexDirection: "row", overflow: "scroll" }}
        >
          <h3 style={{ marginTop: "20px" }} class="fontclassnavitems">
            Request Logs.
          </h3>
          <Tooltip position="right" content="Reload">
            <Icon
              onClick={getReqLog}
              color="white"
              style={{ marginTop: "27px", marginLeft: "10px" }}
              name="reload"
            ></Icon>
          </Tooltip>
        </div>
        <table style={{ overflow: "scroll" }} id="students">
          <tr>
            <th key="sdf">Ip Adress</th>
            <th key="sdf">Date & Time</th>
            <th key="sdf">Response Time</th>
            <th key="sdf">Url</th>
          </tr>
          <tbody>
            {ReqLog.map((data) => {
              return (
                <tr key={(Math.random() * 10000).toFixed(0)}>
                  <td>{data.ip}</td>
                  <td>{data.time}</td>
                  <td>{data.resp_time + "ms"}</td>
                  <td>{data.url}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h3 style={{ marginTop: "20px" }} class="fontclassnavitems">
          Error Fetching data
        </h3>
        <Tooltip position="right" content="Reload">
          <Icon
            onClick={getReqLog}
            color="white"
            style={{ marginTop: "27px", marginLeft: "10px" }}
            name="reload"
          ></Icon>
        </Tooltip>
      </div>
    );
  }
}
export default RequestLogger;
