import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
function RequestLogger() {
  const { getAccessTokenSilently } = useAuth0();
  const [ReqLog, setReqLog] = useState();
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
        }
      });
  }
  useEffect(() => {
    getReqLog();
  }, []);
  return (
    <div>
      <button class="btn btn-primary" onClick={getReqLog}>
        Refresh
      </button>
      <pre>{JSON.stringify(ReqLog, undefined, 3)}</pre>
    </div>
  );
}
export default RequestLogger;
