import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import "../../assets/dashboard.css";
import {
  useAuth0,
  isAuthenticated,
  withAuthenticationRequired,
} from "@auth0/auth0-react";

function Main() {
  const [proxpi, setProxpi] = useState([]);
  const { user, getAccessTokenSilently } = useAuth0();
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
      });
  }
  useEffect(() => {
    getProxpi();
  }, []);

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

                <a href="#" class="btn btn-primary">
                  DashBoard
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Main;
