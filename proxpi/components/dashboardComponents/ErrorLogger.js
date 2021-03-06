import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Icon, Tooltip } from "@auth0/cosmos";
import swal from "sweetalert2/dist/sweetalert2.all.min.js";
import axios from "axios";
import "../../assets/scroller.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
function ErrorLogger() {
  const { getAccessTokenSilently } = useAuth0();
  const [ErrLog, setErrLog] = useState();
  const [l, sl] = useState(false);

  async function getErrLog() {
    const tokenGPARL = await getAccessTokenSilently();
    //GPA means Get Proxpi analytics Request Log
    await axios
      .request({
        method: "GET",
        url: `/get/errlog/${window.location.pathname.split("/")[3]}`,
        headers: {
          Authorization: `Bearer ${tokenGPARL}`,
        },
      })
      .then((data) => {
        if (!data.data.success == false) {
        } else {
          setErrLog(data.data.errlog.errlogs);
          sl(true);
        }
      });
  }
  useEffect(() => {
    getErrLog();
  }, []);

  function add(errdata) {
    new swal("Nothing to add", JSON.stringify(errdata, undefined, 3), "");
  }
  if (l) {
    return (
      <div
        class="mainbody nmorphism-container tab-scroller"
        style={{ overflow: "scroll" }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h3 style={{ marginTop: "20px" }} class="fontclassnavitems">
            Error Logs.
          </h3>
          <Tooltip position="right" content="Reload">
            <Icon
              onClick={getErrLog}
              color="white"
              style={{ marginTop: "27px", marginLeft: "10px" }}
              name="reload"
            ></Icon>
          </Tooltip>
        </div>
        <table id="students">
          <tr>
            <th key="sdf">Ip Adress</th>
            <th key="sdf">Error name</th>
            <th key="sdf">Time</th>
            <th key="sdf">Url</th>
            <th key="sdf">Logs</th>
            <th key="sdf">Report</th>
          </tr>
          <tbody>
            {ErrLog.map((data) => {
              return (
                <tr key={(Math.random() * 10000).toFixed(0)}>
                  <td>{data.ip}</td>
                  <td>{data.name}</td>
                  <td>{data.Errtime}</td>
                  <td>{data.requrl}</td>
                  <td>
                    <button
                      class="btn btn-primary btn-sm"
                      onClick={() => {
                        add(data.ErrLog);
                      }}
                    >
                      Logs
                    </button>
                  </td>
                  <td>
                    <button class="btn btn-primary btn-sm">Report</button>
                  </td>
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
          <button
            class="btn btn-primary"
            onClick={() => {
              getErrLog();
            }}
          >
            <i class="fas fa-sync-alt"></i> Refresh
          </button>
        </div>
      </div>
    );
  }
}
export default ErrorLogger;
