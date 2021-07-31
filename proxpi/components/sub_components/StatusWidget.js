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
      <a href="https://stats.uptimerobot.com/poBOBizV5q" target="_blank">
        <button
          style={{ backgroundColor: "#171c23", margin: "2%" }}
          class="btn btn-secondary"
        >
          {" "}
          <i style={{ color: data.state }} class="fas fa-circle"></i> {}
          {data.message}
        </button>
      </a>
    );
  }
};
export default StatusWidget;
