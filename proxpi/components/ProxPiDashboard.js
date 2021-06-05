import React, { useState, useEffect } from "react";
import Home from "../components/dashboardComponents/Home";
import Settings from "../components/dashboardComponents/Settings";
import Block from "../components/dashboardComponents/Block";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
function ProxPiDashboard() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [proxpiData, setProxpiData] = useState({});

  const [error, setError] = useState(false);
  async function getProxpiUser() {
    const tokenGPA = await getAccessTokenSilently();
    //GPA means Get Proxpi analytics
    await axios
      .request({
        method: "GET",
        url: `/get/proxpianalytics/${window.location.pathname.split("/")[3]}`,
        headers: {
          Authorization: `Bearer ${tokenGPA}`,
        },
      })
      .then((data) => {
        if (!data.data.success == false) {
          setError(ture);
        } else {
          setProxpiData(data.data.proxpidata);
        }
      });
  }
  useEffect(() => {
    getProxpiUser();
  }, []);
  return (
    <div style={{ margin: "2.5%" }}>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="home-tab"
            data-toggle="tab"
            href="#home"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            {" "}
            <i class="fas fa-home"></i> Home
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="analytics-tab"
            data-toggle="tab"
            href="#analysis"
            role="tab"
            aria-controls="analysis"
            aria-selected="false"
          >
            {" "}
            <i class="far fa-chart-bar"></i> Analytics
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="geospatialanalysis-tab"
            data-toggle="tab"
            href="#geoanalysis"
            role="tab"
            aria-controls="geoanalysis"
            aria-selected="false"
          >
            {" "}
            <i class="fas fa-atlas"></i> Geospatial Analytics
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="access-tab"
            data-toggle="tab"
            href="#access"
            role="tab"
            aria-controls="access"
            aria-selected="false"
          >
            {" "}
            <i class="fas fa-user-lock"></i> Access Tokens
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="ban-tab"
            data-toggle="tab"
            href="#ban"
            role="tab"
            aria-controls="ban"
            aria-selected="false"
          >
            {" "}
            <i class="fas fa-ban"></i> Block
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="settings-tab"
            data-toggle="tab"
            href="#settings"
            role="tab"
            aria-controls="settings"
            aria-selected="false"
          >
            {" "}
            <i class="fas fa-sliders-h"></i> Settings
          </a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <Home data={proxpiData} />
        </div>
        <div
          class="tab-pane fade"
          id="analysis"
          role="tabpanel"
          aria-labelledby="analytics-tab"
        >
          HIIIIIIIIIII
        </div>
        <div
          class="tab-pane fade"
          id="geoanalysis"
          role="tabpanel"
          aria-labelledby="geospatialanalysis-tab"
        >
          KJSGKUGSsdfsdfsdDKUSGD
        </div>
        <div
          class="tab-pane fade"
          id="access"
          role="tabpanel"
          aria-labelledby="access-tab"
        >
          KJSGKUfdfGSDKUSGD
        </div>
        <div
          class="tab-pane fade"
          id="ban"
          role="tabpanel"
          aria-labelledby="ban-tab"
        >
          <Block data={proxpiData}></Block>
        </div>
        <div
          class="tab-pane fade"
          id="settings"
          role="tabpanel"
          aria-labelledby="settings-tab"
        >
          <Settings data={proxpiData} />
        </div>
      </div>
    </div>
  );
}
export default ProxPiDashboard;
