import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashBoard from "../components/DashBoard";
import Main from "../components/Main";
import NavBar from "../components/NavBar";
import Pricing from "../components/Pricing";
import Createnew from "../components/Createnew";
import Footer from "../components/Footer";
import axios from "axios";
import ProxPiDashboard from "../components/ProxPiDashboard";

export default () => {
  axios.defaults.baseURL = "https://proxpiapi.herokuapp.com";
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Main />
            <Footer/>
          </Route>
          <Route exact path="/pricing">
            <Pricing />
             <Footer/>
          </Route>
          <Route
            path="/dashboard"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} component={DashBoard} exact />
                <Route path={`${url}/new`} component={Createnew} />

                <Route path={`${url}/home/:id`} component={ProxPiDashboard} />
              </>
            )}
          />
        </Switch>
       
      </div>
    </Router>
  );
};
