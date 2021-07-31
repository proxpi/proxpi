import React, { Component, useEffect, useState } from "react";
import axios from "axios";

const StatusWidget = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("https://proxpi-status-page.deta.dev/").then((data) => {
      setData(data.data);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <h6>Loading</h6>;
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "fit-content",
          height: "fit-content",
          color: "aqua",
          justifyContent: "center",
          backgroundColor: "rgb(23, 28, 35)",
          margin: "2%",
          padding: "1%",
        }}
      >
        <h5 style={{ marginBottom: "0px" }} id="amsg">
          <img
            width="50px"
            height="50px"
            src={
              data.state == "success"
                ? "https://raw.githubusercontent.com/proxpi/images/main/successdot.png"
                : "https://raw.githubusercontent.com/proxpi/images/main/dangerdot.png"
            }
          ></img>{" "}
          <a target="_blank" href="https://stats.uptimerobot.com/poBOBizV5q">
            {data.message}
          </a>
        </h5>
      </div>
    );
  }
};
export default StatusWidget;
