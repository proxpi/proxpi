import React, { useState } from "react";
import Loading from "./Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios";
import { useHistory } from "react-router-dom";
function Createnew() {
  let history = useHistory();
  const { user, getAccessTokenSilently } = useAuth0();
  const [proxpi, setProxpi] = useState({
    name: "",
    method: "",
    access: "",
    url: "",
  });
  const [error, setError] = useState(true);
  const [c_error, setC_error] = useState(false);

  function handlePut(e) {
    setProxpi({ ...proxpi, [e.target.name]: e.target.value });
  }
  async function createproxpi() {
    const tokenCP = await getAccessTokenSilently();
    await axios
      .post(
        "/new/create",
        {
          body: proxpi,
          ...user,
        },
        { headers: { authorization: `Bearer ${tokenCP}` } }
      )
      .then((resp) => {
        if (resp.data.statusb) {
          history.push("/dashboard");
        } else {
          setC_error(true);
        }
      });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!proxpi.name || !proxpi.method || !proxpi.access) {
      setError(true);
    } else {
      setError(false);
      createproxpi();
    }
  }
  return (
    <div style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}>
      <main style={{ margin: "auto" }} class="form-signin col-lg-5">
        <form>
          <h1 class="h3 mb-3 fw-normal">Create a new ProxPi</h1>
          {c_error ? (
            <div class="alert alert-warning" role="alert">
              Error creating Proxpi
            </div>
          ) : (
            <p></p>
          )}
          <hr />
          <div class="form-floating">
            <input
              onChange={handlePut}
              value={proxpi.name}
              required
              type="name"
              name="name"
              class="form-control"
              id="floatingInput"
              placeholder="blah_blah_blah"
            />
            <label for="floatingInput">Name</label>
          </div>
          <hr />
          <div class="form-floating">
            <input
              onChange={handlePut}
              value={proxpi.url}
              required
              type="url"
              name="url"
              class="form-control"
              id="floatingInputURL"
              placeholder="https://example.com/api"
            />
            <label for="floatingInputURL">Your API endpoint to Proxy.</label>
          </div>
          <hr />
          <div class="form-group">
            <select
              onChange={handlePut}
              required
              class="custom-select"
              name="method"
              id="inputGroupSelect01"
            >
              <option selected>Choose the API request Method</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
            </select>
          </div>

          <p>Access</p>
          <div class="form-check">
            <input
              onChange={handlePut}
              class="form-check-input"
              type="radio"
              value="public"
              name="access"
              id="flexRadioDefault1"
              checked={proxpi.access === "public"}
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Public
            </label>
          </div>
          <div class="form-check">
            <input
              onChange={handlePut}
              class="form-check-input"
              type="radio"
              value="private"
              name="access"
              id="flexRadioDefault2"
              checked={proxpi.access === "private"}
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Private
            </label>
          </div>
          <hr />
          <p>
            If the access is set a private you can set the URL which has access
            in the settings of proxpi.
          </p>
          <button onClick={handleSubmit} class="w-100 btn btn-lg btn-primary">
            Create
          </button>
          {error ? (
            <div class="alert alert-warning" role="alert">
              Missing form inputs
            </div>
          ) : (
            <p></p>
          )}
        </form>
      </main>
    </div>
  );
}
export default withAuthenticationRequired(Createnew, {
  onRedirecting: () => <Loading />,
  returnTo: "/dashboard/new",
});
