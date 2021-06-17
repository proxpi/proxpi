import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
function ResponseTime() {
  const { getAccessTokenSilently } = useAuth0();
  const [respTime, setRespTime] = useState();
  async function getRespTime() {
    const tokenGPART = await getAccessTokenSilently();
    //GPA means Get Proxpi analytics Response Time
    await axios
      .request({
        method: "GET",
        url: `/get/resptime/${window.location.pathname.split("/")[3]}`,
        headers: {
          Authorization: `Bearer ${tokenGPART}`,
        },
      })
      .then((data) => {
        if (!data.data.success == false) {
        } else {
          setRespTime(data.data.respTime.resp_time_data);
        }
      });
  }
  useEffect(() => {
    getRespTime();
  }, []);
  return (
    <div>
      <button class="btn btn-primary" onClick={getRespTime}>
        Refresh
      </button>
      <pre>{JSON.stringify(respTime, undefined, 3)}</pre>
    </div>
  );
}
export default ResponseTime;
