import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
function GeoAnalytics() {
  const { getAccessTokenSilently } = useAuth0();
  const [geoData, setGeoData] = useState();
  async function getGeoAnalytics() {
    const tokenGPAG = await getAccessTokenSilently();
    //GPA means Get Proxpi analytics Geo
    await axios
      .request({
        method: "GET",
        url: `/get/geoanalytics/${window.location.pathname.split("/")[3]}`,
        headers: {
          Authorization: `Bearer ${tokenGPAG}`,
        },
      })
      .then((data) => {
        if (!data.data.success == false) {
        } else {
          setGeoData(data.data.geoAnalytics.geoData);
        }
      });
  }
  useEffect(() => {
    getGeoAnalytics();
  }, []);
  return (
    <div>
      <button class="btn btn-primary" onClick={getGeoAnalytics}>
        Refresh
      </button>
      <pre>{JSON.stringify(geoData, undefined, 3)}</pre>
    </div>
  );
}
export default GeoAnalytics;
