import React from "react";
function ProxPiDashboard() {
  const URL_PARAM = window.location.pathname.split("/")[2];
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
          {URL_PARAM}
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
          id="settings"
          role="tabpanel"
          aria-labelledby="settings-tab"
        >
          KJSGKsdfsdfsdfUGSDKUSGD
        </div>
      </div>
    </div>
  );
}
export default ProxPiDashboard;
