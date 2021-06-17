import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
function ErrorLogger() {
  const { getAccessTokenSilently } = useAuth0();
  const [ErrLog, setErrLog] = useState();
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
        }
      });
  }
  useEffect(() => {
    getErrLog();
  }, []);
  return (
    <div>
      <button class="btn btn-primary" onClick={getErrLog}>
        Refresh
      </button>
      <pre>{JSON.stringify(ErrLog, undefined, 3)}</pre>
    </div>
  );
}
export default ErrorLogger;
