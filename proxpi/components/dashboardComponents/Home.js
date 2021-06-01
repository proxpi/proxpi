import React from "react";

function Home(props) {
  return (
    <div>
      <div style={{ width: "50%", margin: "2%" }}>
        <div class="alert alert-primary" role="alert">
          Your ProxPi URL is https://localhost:8080/{props.data.name}
        </div>
      </div>
    </div>
  );
}
export default Home;
