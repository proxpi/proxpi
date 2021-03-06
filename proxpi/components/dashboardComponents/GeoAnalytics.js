import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "../../assets/home.css";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Icon, Tooltip } from "@auth0/cosmos";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";

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
      <div
        class="mainbody"
        style={{
          background: "#090c10",
          boxShadow: "7px 7px 14px #050609,-7px -7px 14px #0d1217",
          margin: "2%",
          borderRadius: "2%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h3 style={{ marginTop: "20px" }} class="fontclassnavitems">
            GeoSpatial Analytics.
          </h3>
          <Tooltip position="right" content="Reload">
            <Icon
              onClick={getGeoAnalytics}
              color="white"
              style={{ marginTop: "27px", marginLeft: "10px" }}
              name="reload"
            ></Icon>
          </Tooltip>
        </div>
        <div
          style={{
            margin: "3%",
            border: "1px blue solid",
            borderRadius: "1%",
            backgroundColor: "#1b2029",
          }}
        >
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
              <Marker key="das" coordinates={data}>
                <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
              </Marker>
            ))}
          </ComposableMap>
        </div>
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
              getGeoAnalytics();
            }}
          >
            <i class="fas fa-sync-alt"></i> Refresh
          </button>
        </div>
      </div>
    );
  }
}
export default GeoAnalytics;
