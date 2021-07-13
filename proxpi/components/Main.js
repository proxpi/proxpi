import React from "react";
import "../assets/mainpage.css";
import { Button } from "@auth0/cosmos";
import { useHistory } from "react-router-dom";
function Main() {
  let history = useHistory();
  return (
    <div>
      <div class="maincontaier">
        <div class="intro">
          <span class="introtext">
            <b>A Free, Open Source Proxy for your RESTful API's</b>
          </span>

          <p class="desc">
            <b>
              Never worry about spinning up a server to call a REST API which
              needs API Keys, we got you covered
            </b>
          </p>
          <ul class="parentlist">
            <li class="listitem">Headers encrypted with private key</li>
            <li class="listitem">Daily analytics</li>
            <li class="listitem">Geo-Spatial Analytics</li>
            <li class="listitem">Public, Private modes</li>
            <li class="listitem">Request , Error logs</li>
            <li class="listitem">IP / URL blocking</li>
          </ul>
          <div class="basicbuttons">
            <Button
              size="compressed"
              icon="dashboard"
              style={{
                marginRight: "1%",
                backgroundColor: "#226f6c",
                border: "none",
              }}
              appearance="primary"
              onClick={() => {
                history.push("/dashboard");
              }}
            >
              Start project
            </Button>
            <Button
              style={{ backgroundColor: "rgb(27 32 41)", border: "none" }}
              size="compressed"
              icon="notes"
              appearance="primary"
            >
              Documentation
            </Button>
          </div>
        </div>
        <div class="introvideo">
          <iframe
            width="100%"
            class="videocontainer"
            src="https://www.youtube.com/embed/LoRpJTD3HFY"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <div class="maincontaier">
        <div class="features">
          <div class="featuredesc">
            <span class="featureheading">
              <b>Analytics</b>
            </span>
            <p class="descfeature">
              ProxPi provides you detailed analytics of your API. Daily
              analytics is visualisable in chart form. Geo Spatial Analytics
              gives the user a vague idea from where there endpoint is called
              and is visualisable in a map. Analytics feature is free for all
              users.
            </p>
            <Button
              size="compressed"
              icon="logs"
              style={{
                marginRight: "1%",
                backgroundColor: "#226f6c",
                border: "none",
              }}
              appearance="primary"
              onClick={() => {
                history.push("/dashboard");
              }}
            >
              Learn More
            </Button>
          </div>
          <div class="featureimage">
            <img
              width="90%"
              height="80%"
              src="https://raw.githubusercontent.com/fredysomy/HealthApp/master/img/Untitled_design__1_-removebg.png"
            ></img>
          </div>
        </div>
        <div class="features">
          <div class="featuredesc">
            <span class="featureheading">
              <b>Logging</b>
            </span>
            <p class="descfeature">
              All the incoming API requests are logged and disaplyed in
              dashboard. They are classified into Request logs and Error logs.
              request logs store all the success requests with IP adress and URL
              of origin so you can block them if they find suspicious.
            </p>
            <Button
              size="compressed"
              icon="logs"
              style={{
                marginRight: "1%",
                backgroundColor: "#226f6c",
                border: "none",
              }}
              appearance="primary"
              onClick={() => {
                history.push("/dashboard");
              }}
            >
              Learn More
            </Button>
          </div>
          <div class="featureimage">
            <img
              width="100%"
              height="80%"
              src="https://raw.githubusercontent.com/fredysomy/HealthApp/master/img/Untitled_design__2_-removebg-preview.png"
            ></img>
          </div>
        </div>
        <div class="features">
          <div class="featuredesc">
            <span class="featureheading">
              <b>Block IP/URL</b>
            </span>
            <p class="descfeature">
              ProxPi makes it easier to block IP adresses and URL's from
              accessing your Public API. When a unauthorized req froma blocked
              IP/URL is made it will be logged in the Error log tab in
              dashboard.
            </p>
            <Button
              size="compressed"
              icon="logs"
              style={{
                marginRight: "1%",
                backgroundColor: "#226f6c",
                border: "none",
              }}
              appearance="primary"
              onClick={() => {
                history.push("/dashboard");
              }}
            >
              Learn More
            </Button>
          </div>
          <div class="featureimage">
            <img
              width="100%"
              height="100%"
              src="https://raw.githubusercontent.com/fredysomy/HealthApp/master/img/23.54.43.23__1_-removebg.png"
            ></img>
          </div>
        </div>
        <hr style={{ borderTop: " 1px dashed red" }} />
      </div>
      <div style={{ margin: "0%" }} class="maincontaier">
        <div class="communityjoin">
          <span class="headingofadditionalfeatures">
            <b>With ProxPi, your API is safe.</b>
          </span>
        </div>
        <div class="features" style={{ justifyContent: "center" }}>
          <div
            class="card"
            style={{ width: " 18rem", backgroundColor: "#171c23" }}
          >
            <div class="card-body">
              <h5 class="card-title fontsbasic">
                <i class="fas fa-key"></i> {"  "}Secure
              </h5>
              <p class="card-text">
                All the headers of your API given is Encrypted with a Secret key
                and is only decrypted in the Backend for API request and to be
                shown in frontend
              </p>
              <Button
                size="compressed"
                icon="external-link"
                style={{
                  marginRight: "1%",
                  backgroundColor: "#226f6c",
                  border: "none",
                }}
                appearance="primary"
                onClick={() => {
                  history.push("/dashboard");
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div
            class="card"
            style={{ width: "19.5rem", backgroundColor: "#171c23" }}
          >
            <div class="card-body">
              <h5 class="card-title  fontsbasic">
                <i class="far fa-eye-slash"></i> Public/Private Modes
              </h5>
              <p class="card-text">
                Public mode allows anyone to access your API excluding the
                Blocked Sources. Private mode only allows a URL specified by you
                to make requests.
              </p>
              <Button
                size="compressed"
                icon="external-link"
                style={{
                  marginRight: "1%",
                  backgroundColor: "#226f6c",
                  border: "none",
                }}
                appearance="primary"
                onClick={() => {
                  history.push("/dashboard");
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column" }}
          class="communityjoin"
        >
          <div>
            <span class="headingofadditionalfeatures">
              <b>Join the Community</b>
            </span>
          </div>
          <div class="communityenclosingdiv">
            <p class="joincommunitydesc">
              Join a Community of Developers, amazing people and problem solvers
            </p>
            <div class="buttongroup">
              <Button
                size="large"
                icon="brand-github"
                style={{
                  marginRight: "1%",
                  backgroundColor: "#226f6c",
                  border: "none",
                }}
                appearance="primary"
              >
                Github Discussions
              </Button>
              <Button
                size="large"
                style={{
                  marginRight: "1%",
                  backgroundColor: "#226f6c",
                  border: "none",
                }}
                appearance="primary"
              >
                <i class="fab fa-discord"></i> Discord
              </Button>
              <Button
                size="large"
                style={{
                  marginRight: "1%",
                  backgroundColor: "#226f6c",
                  border: "none",
                }}
                appearance="primary"
              >
                <i class="fab fa-telegram-plane"></i> telegram
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Main;
