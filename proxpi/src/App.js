import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashBoard from "../components/DashBoard";
import Main from "../components/Main";
import NavBar from "../components/NavBar";
import Pricing from "../components/Pricing";
import Createnew from "../components/Createnew";
import axios from "axios";
export default () => {
  axios.defaults.baseURL = "http://localhost:8080";
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/pricing">
            <Pricing />
          </Route>
          <Route
            path="/dashboard"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} component={DashBoard} exact />
                <Route path={`${url}/new`} component={Createnew} />
              </>
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};
