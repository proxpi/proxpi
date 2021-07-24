import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Icon, Tooltip } from "@auth0/cosmos";
import "../../assets/logger.css";
import "../../assets/scroller.css";
import "../../assets/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
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
      <div
        align="center"
        style={{ justifyContent: "center", width: "100%", marginTop: "5%" }}
      >
        <Spinner animation="grow" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h5>Failed to load Data</h5>
          <div
            style={{ width: "90%", alignContent: "center" }}
            class="alert alert-danger"
            role="alert"
          >
            This is a known bug which is actively debugged. ProxPi is in Beta
            stage. None of your data is lost or compromised. Please click the
            Refresh button a few times.
          </div>
          <button class="btn btn-primary" onClick={() => {getReqLog()}}>
            <i class="fas fa-sync-alt"></i> Refresh
          </button>
        </div>
      </div>
    );
  }
}
export default RequestLogger;
