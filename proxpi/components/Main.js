import React from "react";
import "../assets/mainpage.css";
function Main() {
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
            <li class="listitem">Set private access URL</li>
          </ul>
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
    </div>
  );
}
export default Main;
