import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashBoard from "../components/DashBoard";
import Main from "../components/Main";
import NavBar from "../components/NavBar";
import Pricing from "../components/Pricing";
export default () => {
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
          <Route exact path="/dashboard">
            <DashBoard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
