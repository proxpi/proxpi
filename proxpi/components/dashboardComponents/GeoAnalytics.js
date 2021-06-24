import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function GeoAnalytics() {
  const { getAccessTokenSilently } = useAuth0();
  const [geoData, setGeoData] = useState([]);
  const [loaded, setLoaded] = useState(false);
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
          setLoaded(true);
        }
      });
  }
  useEffect(() => {
    getGeoAnalytics();
  }, []);
  const position = [0, 0];
  const fillBlueOptions = { fillColor: "blue" };

  if (loaded) {
    return (
      <div>
        <button class="btn btn-primary" onClick={getGeoAnalytics}>
          Refresh
        </button>
        <div style={{ margin: "3%" }}>
          <ComposableMap>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#EAEAEC"
                    stroke="#D6D6DA"
                  />
                ))
              }
            </Geographies>
            {geoData.map((data) => (
              <Marker key="das" coordinates={data.reverse()}>
                <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </div>
    );
  } else {
    return <h1>fjskdfnkjsd</h1>;
  }
}
export default GeoAnalytics;
