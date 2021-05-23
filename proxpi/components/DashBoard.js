import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  useAuth0,
  isAuthenticated,
  withAuthenticationRequired,
} from "@auth0/auth0-react";
import Loading from "../components/Loading";

function DashBoard() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [activate, setActivated] = useState(false);
  const [plan, setPlan] = useState({});
  async function checkActivation() {
    const tokenCA = await getAccessTokenSilently();
    await axios
      .post(
        "http://localhost:8080/plan/check",
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
        "http://localhost:8080/plan/activate",
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
    <div
      style={{
        margin: "2%",
        display: "flex",
        flexDirection: "row",
        padding: "7px 7px",
      }}
      class="jumbotron"
    >
      <div
        class="modal fade bd-example-modal-sm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
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
        <h3 style={{ marginLeft: "10px" }}>{user.given_name}</h3>
        <h6 style={{ marginLeft: "10px" }}>Plan : {plan.plan}</h6>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h6 style={{ marginLeft: "10px" }}>Status:</h6>
          {activate ? (
            <h6
              style={{ marginLeft: "4px", color: "#3d9fcf" }}
              data-toggle="modal"
              data-target=".bd-example-modal-sm"
            >
              Activated
            </h6>
          ) : (
            <h6
              style={{ marginLeft: "4px", color: "#ff4d4d" }}
              onClick={ActivateUser}
            >
              Click to Activate
            </h6>
          )}
        </div>
      </div>
    </div>
  );
}
export default withAuthenticationRequired(DashBoard, {
  onRedirecting: () => <Loading />,
  returnTo: "/dashboard",
});
