import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashBoard from "../components/DashBoard";
import Main from "../components/Main";
import NavBar from "../components/NavBar";
import Pricing from "../components/Pricing";
import axios from "axios"
export default () => {
  axios.defaults.baseURL = 'http://localhost:8080';
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
