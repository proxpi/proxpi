import React, { useState, useEffect } from "react";
import Home from "../components/dashboardComponents/Home";
import Settings from "../components/dashboardComponents/Settings";
import Block from "../components/dashboardComponents/Block";
import Loading from "../components/Loading";
import DailyAnalytics from "../components/dashboardComponents/DailyAnalytics";
import RequestLogger from "../components/dashboardComponents/RequestLogger";
import ErrorLogger from "./dashboardComponents/ErrorLogger";
import GeoAnalytics from "../components/dashboardComponents/GeoAnalytics";
import ResponseTime from "./dashboardComponents/ResponseTime";
import AccessTokens from "./dashboardComponents/AccessTokens";

import axios from "axios";
import "../assets/navs.css";
import "../assets/fonts.css";
import { useHistory } from "react-router-dom";
import "../assets/navs.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

function ProxPiDashboard() {
  const history = useHistory();
  const [subdata, setSubData] = useState({});
  const { user, getAccessTokenSilently } = useAuth0();
  const [proxpiData, setProxpiData] = useState({});
  const [loaded, setLoaded] = useState(false);
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
        if (data.data.success == false) {
          history.push("/dashboard");
        } else {
          setProxpiData(data.data.proxpidata);
          setSubData(data.data.subdata);
          setLoaded(true);
        }
      });
  }
  useEffect(() => {
    getProxpiUser();
  }, []);
  if (loaded) {
    return (
      <div style={{ margin: "2.5%" }}>
        <ul class="nav nav-tabs nav-pills" id="myTab" role="tablist">
          <li class="nav-item" id="nav-home">
            <a
              class="nav-link active fontclassnavitems"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              {" "}
              <i class="fas fa-home "></i> Home
            </a>
          </li>
          <li class="nav-item" id="nav-tics">
            <a
              class="nav-link fontclassnavitems"
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
          <li class="nav-item" id="nav-analytics">
            <a
              class="nav-link fontclassnavitems"
              id="geospatialanalysis-tab"
              data-toggle="tab"
              href="#geoanalysis"
              role="tab"
              aria-controls="geoanalysis"
              aria-selected="false"
            >
              {" "}
              <i class="fas fa-atlas"></i> Geo Analytics
            </a>
          </li>
          <li class="nav-item" id="nav-access">
            <a
              class="nav-link fontclassnavitems"
              id="access-tab"
              data-toggle="tab"
              href="#access"
              role="tab"
              aria-controls="access"
              aria-selected="false"
            >
              {" "}
              <i class="fas fa-user-lock"></i> Access Keys
            </a>
          </li>
          <li class="nav-item" id="nav-resptime">
            <a
              class="nav-link fontclassnavitems"
              id="resptime-tab"
              data-toggle="tab"
              href="#resptime"
              role="tab"
              aria-controls="resptime"
              aria-selected="false"
            >
              {" "}
              <i class="fas fa-history"></i> Response Time
            </a>
          </li>
          <li class="nav-item" id="nav-ban">
            <a
              class="nav-link fontclassnavitems"
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
          <li class="nav-item" id="nav-reqlog">
            <a
              class="nav-link fontclassnavitems"
              id="reqlog-tab"
              data-toggle="tab"
              href="#reqlog"
              role="tab"
              aria-controls="reqlog"
              aria-selected="false"
            >
              {" "}
              <i class="fas fa-clipboard-list"></i> Request Log
            </a>
          </li>
          <li class="nav-item" id="nav-errlog">
            <a
              class="nav-link fontclassnavitems"
              id="errlog-tab"
              data-toggle="tab"
              href="#errlog"
              role="tab"
              aria-controls="errlog"
              aria-selected="false"
            >
              {" "}
              <i class="fas fa-exclamation-circle"></i> Error Log
            </a>
          </li>
          <li class="nav-item" id="nav-settings">
            <a
              class="nav-link fontclassnavitems"
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
            class="tab-pane fade show active navscomp "
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <Home data={proxpiData} briefAnalytics={subdata} />
          </div>
          <div
            class="tab-pane fade"
            id="analysis"
            role="tabpanel"
            aria-labelledby="analytics-tab"
          >
            <DailyAnalytics />
          </div>
          <div
            class="tab-pane fade"
            id="geoanalysis"
            role="tabpanel"
            aria-labelledby="geospatialanalysis-tab"
          >
            <GeoAnalytics />
          </div>
          <div
            class="tab-pane fade"
            id="resptime"
            role="tabpanel"
            aria-labelledby="resptime-tab"
          >
            <ResponseTime />
          </div>
          <div
            class="tab-pane fade"
            id="reqlog"
            role="tabpanel"
            aria-labelledby="reqlog-tab"
          >
            <RequestLogger />
          </div>
          <div
            class="tab-pane fade"
            id="errlog"
            role="tabpanel"
            aria-labelledby="errlog-tab"
          >
            <ErrorLogger />
          </div>
          <div
            class="tab-pane fade"
            id="access"
            role="tabpanel"
            aria-labelledby="access-tab"
          >
            <AccessTokens />
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
  } else {
    return <Loading />;
  }
}
export default withAuthenticationRequired(ProxPiDashboard, {
  onRedirecting: () => <Loading />,
  returnTo: "/",
});
