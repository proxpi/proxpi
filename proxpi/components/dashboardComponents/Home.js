import React from "react";
import "../../assets/home.css";
function Home(props) {
  var BaseUrlProxpi = "https://proxpiapi.herokuapp.com/proxpi/api/";
  return (
    <div>
      <div class="proxpiurl ">
        <h4>Your ProxPi URL:</h4>
        <div class="input-group">
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
    </div>
  );
}
export default Home;
