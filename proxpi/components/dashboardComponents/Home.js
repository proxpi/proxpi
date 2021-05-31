import React, { useContext } from "react";

function Home(props) {
  return (
    <div>
      <div style={{ width: "50%", margin: "2%" }}>
        <div class="alert alert-primary" role="alert">
          Your ProxPi URL is https://localhost:8080/{props.Pdata.name}
        </div>
      </div>
      <pre>{JSON.stringify(props.Pdata, undefined, 2)}</pre>
    </div>
  );
}
export default Home;
