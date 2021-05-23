import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
ReactDOM.render(
  <Auth0Provider
    domain="proxpi.us.auth0.com"
    clientId="FXMLWvTeX1QF5FejUDs6udLCPJNXWgAn"
    redirectUri={window.location.origin}
    audience="fredysomy@gmail.com"
    scope="openid profile email"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
