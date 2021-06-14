import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
function DailyAnalytics() {
  const { getAccessTokenSilently } = useAuth0();
  const [DailyData, setDailydata] = useState();
  async function getAnalytics() {
    const tokenGPAD = await getAccessTokenSilently();
    //GPA means Get Proxpi analytics daily
    await axios
      .request({
        method: "GET",
        url: `/get/analytics/${window.location.pathname.split("/")[3]}`,
        headers: {
          Authorization: `Bearer ${tokenGPAD}`,
        },
      })
      .then((data) => {
        if (!data.data.success == false) {
        } else {
          setDailydata(data.data.analyticsdata.analytics_daily);
        }
      });
  }
  useEffect(() => {
    getAnalytics();
  }, []);
  return (
    <div>
      <button class="btn btn-primary" onClick={getAnalytics}>
        Refresh
      </button>
      <pre>{JSON.stringify(DailyData, undefined, 3)}</pre>
    </div>
  );
}
export default DailyAnalytics;
