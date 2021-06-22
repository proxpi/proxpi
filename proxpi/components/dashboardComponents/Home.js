import React from "react";
import "../../assets/home.css";
import "../../assets/fonts.css";
import { Icon } from "@auth0/cosmos";
function Home(props) {
  var BaseUrlProxpi = "https://proxpiapi.herokuapp.com/proxpi/api/";

  return (
    <div
      style={{
        backgroundColor: "#1b2029",
        boxShadow: "2px 2px 4px #0c0e14, -2px -2px 4px #303852",
      }}
    >
      <div class="proxpiurl " style={{ marginTop: "5px" }}>
        <div style={{ marginTop: "1%" }}>
          <hr />
          <h4 style={{ marginTop: "10px" }} class="fontclassnavitems">
            Your ProxPi URL:
          </h4>
          <hr />
          <div class="input-group inputgrp">
            <input
              type="url"
              class="form-control"
              id="baseurl"
              value={BaseUrlProxpi + props.data.key}
            ></input>
            <div class="input-group-append">
              <button
                class="btn btn-outline-primary"
                type="button"
                id="button-addon2"
                onClick={() => {
                  navigator.clipboard.writeText(BaseUrlProxpi + props.data.key);
                }}
              >
                <i class="far fa-clipboard"></i>
              </button>
            </div>
          </div>
        </div>
        <hr />
        <h4 style={{ marginTop: "10px" }} class="fontclassnavitems">
          Breif analytics of ProxPi
        </h4>
        <div
          class="lyticsgrp"
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <div
            class="row"
            style={{ margin: "2%", marginLeft: "0", padding: "0" }}
          >
            <div
              class="card analytics"
              style={{
                backgroundColor: "#1b2029",
                border: "0.5px #007bff solid",
              }}
            >
              <div class="card-body">
                <div class="row">
                  <div class="col mt-0">
                    <h5 class="card-title fontclassnavitems">Total Requests</h5>
                  </div>

                  <div class="col-auto">
                    <div class="stat text-primary">
                      <i class="align-middle" data-feather="truck"></i>
                    </div>
                  </div>
                </div>
                <h1 class="mt-1 mb-3 fontclassnavitems colorstuffs">
                  <Icon
                    color="rgb(0, 225, 255)"
                    id="sdf"
                    size="34"
                    name="analytics"
                  ></Icon>{" "}
                  {props.briefAnalytics.totalviews}
                </h1>
                <div class="mb-0">
                  <span class="text-muted">
                    Go to{" "}
                    <span class="clicknavs" style={{ color: "blue" }}>
                      Analytics
                    </span>{" "}
                    for more info
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="row" style={{ margin: "2%", padding: "0" }}>
            <div
              class="card analytics"
              style={{
                backgroundColor: "#1b2029",
                border: "0.5px #007bff solid",
              }}
            >
              <div class="card-body">
                <div class="row">
                  <div class="col mt-0">
                    <h5 class="card-title fontclassnavitems">
                      Logged Requests
                    </h5>
                  </div>

                  <div class="col-auto">
                    <div class="stat text-primary">
                      <i class="align-middle" data-feather="truck"></i>
                    </div>
                  </div>
                </div>
                <h1 class="mt-1 mb-3 fontclassnavitems colorstuffs">
                  <Icon
                    style={{ marginTop: "-3px" }}
                    color="rgb(0, 225, 255)"
                    class="iconsdata"
                    size="34"
                    name="clipboard"
                  ></Icon>{" "}
                  {props.briefAnalytics.totalreq}
                </h1>
                <div class="mb-0">
                  <span class="text-muted">
                    Go to{" "}
                    <span class="clicknavs" style={{ color: "blue" }}>
                      Request log
                    </span>{" "}
                    tab for more info
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="row" style={{ margin: "2%", padding: "0" }}>
            <div
              class="card analytics"
              style={{
                backgroundColor: "#1b2029",
                border: "0.5px #007bff solid",
              }}
            >
              <div class="card-body">
                <div class="row">
                  <div class="col mt-0">
                    <h5 class="card-title fontclassnavitems">Errors</h5>
                  </div>

                  <div class="col-auto">
                    <div class="stat text-primary">
                      <i class="align-middle" data-feather="truck"></i>
                    </div>
                  </div>
                </div>
                <h1 class="mt-1 mb-3 fontclassnavitems colorstuffs">
                  <Icon
                    color="rgb(0, 225, 255)"
                    id="sdf"
                    class="iconsdata"
                    size="35"
                    name="danger-fill"
                  ></Icon>{" "}
                  {props.briefAnalytics.totalerr}
                </h1>
                <div class="mb-0">
                  <span class="text-muted">
                    Go to{" "}
                    <span class="clicknavs" style={{ color: "blue" }}>
                      Error log
                    </span>{" "}
                    tab for more info
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="row" style={{ margin: "2%", padding: "0" }}>
            <div
              class="card analytics"
              style={{
                backgroundColor: "#1b2029",
                border: "0.5px #007bff solid",
              }}
            >
              <div class="card-body">
                <div class="row">
                  <div class="col mt-0">
                    <h5 class="card-title fontclassnavitems"> Response time</h5>
                  </div>

                  <div class="col-auto">
                    <div class="stat text-primary">
                      <i class="align-middle" data-feather="truck"></i>
                    </div>
                  </div>
                </div>
                <h1 class="mt-1 mb-3 fontclassnavitems colorstuffs">
                  <Icon
                    color="rgb(0, 225, 255)"
                    class="iconsdata"
                    size="34"
                    name="clock"
                  ></Icon>{" "}
                  {props.briefAnalytics.resptimeavg.toFixed(0) + "ms"}
                </h1>
                <div class="mb-0">
                  <span class="text-muted">
                    Go to{" "}
                    <span class="clicknavs" style={{ color: "blue" }}>
                      Response time
                    </span>{" "}
                    tab for more info
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
