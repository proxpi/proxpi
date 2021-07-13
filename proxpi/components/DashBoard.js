import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@auth0/cosmos";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import ProxpiView from "./sub_components/ProxpiView";
import "../assets/dashboard.css";
import "../assets/fonts.css";
function DashBoard() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [activate, setActivated] = useState(false);
  const [plan, setPlan] = useState({});
  const requestUrl = process.env.REACT_APP_DOMAIN + "plan/check";

  async function checkActivation() {
    const tokenCA = await getAccessTokenSilently();
    await axios
      .post(
        "/plan/check",
        {
          body: user,
        },

        { headers: { authorization: `Bearer ${tokenCA}` } }
      )
      .then((dataq) => {
        if (dataq.data.boolean == false) {
          setActivated(false);
        } else if (dataq.data.boolean == true) {
          setActivated(true);
          setPlan(dataq.data.user);
        }
      });
  }
  async function ActivateUser() {
    const token = await getAccessTokenSilently();
    await axios
      .post(
        "/plan/activate",
        {
          body: user,
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((userdata) => {
        //console.log(userdata)
        setPlan(userdata.data);
        setActivated(true);
      });
  }
  useEffect(() => {
    checkActivation();
  }, []);
  console.log(plan);
  return (
    <>
      <div
        style={{
          margin: "2%",
          display: "flex",
          width: "96%",

          flexDirection: "row",
          padding: "7px 7px",
          backgroundColor: "#1b2029",
          boxShadow: "2px 2px 4px #0c0e14, -2px -2px 4px #303852",
        }}
        class="jumbotron userdetails"
      >
        <div
          class="modal fade bd-example-modal-sm"
          tabindex="-1"
          role="dialog"
          aria-labelledby="mySmallModalLabel"
          aria-hidden="true"
          style={{ backgroundColor: "#1b2029" }}
        >
          <div class="modal-dialog modal-sm">
            <div class="modal-content">Your Account is Active.</div>
          </div>
        </div>
        <div style={{ marginTop: "auto", marginBottom: "auto" }}>
          <img
            width="80px"
            height="80px"
            style={{ borderRadius: "50%", marginTop: "auto" }}
            src={user.picture}
          />
        </div>
        <div>
          <h5 class="fontclass" style={{ marginLeft: "10px" }}>
            {user.email}
          </h5>
          <h6 class="fontclass" style={{ marginLeft: "10px" }}>
            Plan : {plan.plan}
          </h6>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h6
              class="fontclass"
              style={{ marginLeft: "10px", marginTop: "5px" }}
            >
              Status:
            </h6>
            {activate ? (
              <Badge
                appearance="success"
                style={{ marginLeft: "4px" }}
                data-toggle="modal"
                class="activated"
                data-target=".bd-example-modal-sm"
              >
                Activated
              </Badge>
            ) : (
              <h6
                style={{
                  marginLeft: "4px",
                  color: "#ff4d4d",
                  marginTop: "5px",
                }}
                onClick={ActivateUser}
              >
                Click to Activate
              </h6>
            )}
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "0.5%",
            backgroundColor: "#090c10",
          }}
        >
          <h4
            class="fontclass"
            style={{ marginLeft: "2%", marginTop: "5px", marginBottom: "5px" }}
          >
            Your ProxPi's
          </h4>

          <Link
            style={{ marginLeft: "2%" }}
            class="btn btn-outline-primary"
            role="button"
            to="/dashboard/new"
          >
            {" "}
            <i class="fas fa-plus"></i> Create New
          </Link>
        </div>
        <div
          class="proxpihold"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",

            padding: "0",
          }}
        >
          <ProxpiView />
        </div>
      </div>
    </>
  );
}
export default withAuthenticationRequired(DashBoard, {
  onRedirecting: () => <Loading />,
  returnTo: "/dashboard",
});
