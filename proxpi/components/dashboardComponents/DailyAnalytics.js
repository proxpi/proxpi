import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Line } from "react-chartjs-2";
import { Icon, Tooltip } from "@auth0/cosmos";
import axios from "axios";
import "../../assets/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
function DailyAnalytics(props) {
  const { getAccessTokenSilently } = useAuth0();
  const [DailyData, setDailydata] = useState();
  const [days, setDays] = useState([]);
  const [datadays, setDataDays] = useState([]);
  const [pChange, setPChange] = useState();
  const [l, sl] = useState(false);
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
          setDays(Object.keys(data.data.analyticsdata.analytics_daily));
          setDataDays(Object.values(data.data.analyticsdata.analytics_daily));
          setPChange(
            ((data.data.analyticsdata.analytics_daily[
              Object.keys(data.data.analyticsdata.analytics_daily).reverse()[0]
            ] -
              data.data.analyticsdata.analytics_daily[
                Object.keys(
                  data.data.analyticsdata.analytics_daily
                ).reverse()[1]
              ]) /
              data.data.analyticsdata.analytics_daily[
                Object.keys(
                  data.data.analyticsdata.analytics_daily
                ).reverse()[0]
              ]) *
              100
          );
          sl(true);
        }
      });
  }
  useEffect(() => {
    getAnalytics();
  }, []);

  const data123 = {
    labels: days,
    datasets: [
      {
        label: "Daily",
        data: datadays,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(25, 99, 132, 1)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  console.log(datadays);
  console.log(days);
  if (l) {
    return (
      <>
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
              Daily Analytics.
            </h3>
            <Tooltip position="right" content="Reload">
              <Icon
                onClick={getAnalytics}
                color="white"
                style={{ marginTop: "27px", marginLeft: "10px" }}
                name="reload"
              ></Icon>
            </Tooltip>
          </div>
          <div
            style={{
              margin: "1% 13% 1% 13%",
              backgroundColor: "#1b2029",
              borderRadius: "2%",
            }}
          >
            <Line data={data123} options={options} />
          </div>
          <div
            class="lyticsgrp"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
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
                    <div class="col-auto">
                      <div class="stat text-primary">
                        <i class="align-middle" data-feather="truck"></i>
                      </div>
                    </div>
                  </div>
                  <h1 class="mt-1 mb-3 fontclassnavitems colorstuffs">
                    {props.briefAnalytics.totalviews}
                  </h1>

                  <div class="col mt-0">
                    <h5 class="card-title fontclassnavitems">Total Requests</h5>
                  </div>
                </div>
              </div>
            </div>
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
                    <div class="col-auto">
                      <div class="stat text-primary">
                        <i class="align-middle" data-feather="truck"></i>
                      </div>
                    </div>
                  </div>
                  <h1 class="mt-1 mb-3 fontclassnavitems colorstuffs">
                    {" "}
                    {pChange.toFixed(1) + "%"}
                    {Math.sign(pChange) === -1 ? (
                      <Icon
                        size="30"
                        style={{ marginLeft: "5px" }}
                        color="red"
                        name="arrow-down"
                      ></Icon>
                    ) : (
                      <Icon
                        style={{ marginLeft: "5px" }}
                        size="30"
                        color="green"
                        name="arrow-up"
                      ></Icon>
                    )}
                  </h1>

                  <div class="col mt-0">
                    <h5 class="card-title fontclassnavitems">
                      {" "}
                      Since Last day
                    </h5>
                    <h6 class="card-title fontclassnavitems">
                      {Object.keys(DailyData).reverse()[1]}
                    </h6>
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
                    <div class="col-auto">
                      <div class="stat text-primary">
                        <i class="align-middle" data-feather="truck"></i>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <h1 class="mt-1 mb-3 fontclassnavitems colorstuffs">
                      {Math.max(...Object.values(DailyData))}
                    </h1>
                    <h5
                      style={{ marginTop: "23px", marginLeft: "5px" }}
                      class="fontclassnavitems colorstuffs"
                    >
                      {" "}
                      Requests
                    </h5>
                  </div>
                  <div class="col mt-1">
                    <h5 class="card-title fontclassnavitems">Maximum in</h5>
                    <h6 class="card-title fontclassnavitems">
                      on{" "}
                      {
                        Object.keys(DailyData)[
                          Object.values(DailyData).indexOf(
                            Math.max(...Object.values(DailyData))
                          )
                        ]
                      }
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          align="center"
          style={{ justifyContent: "center", width: "100%", marginTop: "5%" }}
        >
          <Spinner animation="grow" variant="primary" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h3 style={{ marginTop: "20px" }} class="fontclassnavitems">
            Error Fetching data.
          </h3>
          <Tooltip position="right" content="Reload">
            <Icon
              onClick={getAnalytics}
              color="white"
              style={{ marginTop: "27px", marginLeft: "10px" }}
              name="reload"
            ></Icon>
          </Tooltip>
        </div>
      </>
    );
  }
}
export default DailyAnalytics;
