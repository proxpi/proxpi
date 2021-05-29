import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import "../../assets/dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import "../../assets/main.css";
import {
  useAuth0,
  isAuthenticated,
  withAuthenticationRequired,
} from "@auth0/auth0-react";

function Main() {
  const [proxpi, setProxpi] = useState([]);
  const { user, getAccessTokenSilently } = useAuth0();
  const [loaded, setLoaded] = useState(false);
  async function getProxpi() {
    const tokenCG = await getAccessTokenSilently();
    await axios
      .post(
        "/get/proxpi",
        { body: { email: user.email } },
        { headers: { authorization: `Bearer ${tokenCG}` } }
      )
      .then((resp) => {
        setProxpi(resp.data);
        setLoaded(true);
      });
  }
  useEffect(() => {
    getProxpi();
  }, []);
  if (loaded) {
    return (
      <div class="col-sm-12 proxpiview">
        {proxpi.map((data) => {
          return (
            <div class="row" style={{ margin: "2%", padding: "0" }}>
              <div class="card" style={{ width: "250px" }}>
                <div class="card-body">
                  <h5 class="card-title">{data.name}</h5>
                  <p>Method :{data.method}</p>
                  <p>Access :{data.access}</p>
                  <Link to={`dashboard/${data.key}`}>
                    <button class="btn btn-primary">DashBoard</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div
        align="center"
        style={{ justifyContent: "center", width: "100%", marginTop: "5%" }}
      >
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
}
export default Main;
