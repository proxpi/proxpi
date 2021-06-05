import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import dotPropImmutable from "dot-prop-immutable";
import axios from "axios";
import swal from "sweetalert2/dist/sweetalert2.all.min.js";
function Settings(props) {
  var arr = [];
  const [head, setHead] = useState([]);
  const [params, setParams] = useState([]);
  const [body, setBody] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [access, setAccess] = useState();
  const [method, setMethod] = useState();
  const [key, setkey] = useState();
  const [saved, setSaved] = useState(true);

  const { getAccessTokenSilently } = useAuth0();
  async function SendDataToServer() {
    const tokenCPU = await getAccessTokenSilently();
    setSaved(false);
    await axios
      .post(
        "/update/settings",
        {
          body: {
            headerP: head,
            paramsP: params,
            bodyP: body,
            accessP: access,
            methodP: method,
            keyP: key,
          },
        },
        { headers: { authorization: `Bearer ${tokenCPU}` } }
      )
      .then((resp) => {
        if (resp.data.data == undefined) {
          $("#showsuccessmodal").modal("show");
          setSaved(true);
        }
      });
  }
  function handleHeaderAdd() {
    dataHeader = document.getElementById("headeradd").value;
    if (dataHeader) {
      setHead({
        ...head,
        [dataHeader.split(",")[0].trim()]: dataHeader.split(",")[1].trim(),
      });
      document.getElementById("headeradd").value = "";
    } else {
      new swal("Nothing to add", "", "error");
    }
  }
  function handleParamsAdd() {
    dataParams = document.getElementById("paramsadd").value;
    if (dataParams) {
      setParams({
        ...params,
        [dataParams.split(",")[0].trim()]: dataParams.split(",")[1].trim(),
      });
      document.getElementById("paramsadd").value = "";
    } else {
      new swal("Nothing to add", "", "error");
    }
  }
  function handleBodyAdd() {
    dataBody = document.getElementById("bodyadd").value;
    if (dataBody) {
      setBody({
        ...body,
        [dataBody.split(",")[0].trim()]: dataBody.split(",")[1].trim(),
      });
      document.getElementById("bodyadd").value = "";
    } else {
      new swal("Nothing to add", "", "error");
    }
  }

  async function getProxpiUser() {
    const tokenGPA = await getAccessTokenSilently();
    //GPA means Get Proxpi analytics
    await axios
      .request({
        method: "GET",
        url: `/get/proxpi/${window.location.pathname.split("/")[3]}`,
        headers: {
          Authorization: `Bearer ${tokenGPA}`,
        },
      })
      .then((data) => {
        if (!data.data.success == false) {
        } else {
          setHead(data.data.proxpidata.headers || {});
          setBody(data.data.proxpidata.body || {});
          setParams(data.data.proxpidata.params || {});
          setMethod(data.data.proxpidata.method || {});
          setAccess(data.data.proxpidata.access || {});
          setkey(data.data.proxpidata.key);
          setLoaded(true);
        }
      });
  }
  useEffect(() => {
    getProxpiUser();
  }, []);

  return (
    <div style={{ margin: "2% 6%" }}>
      <div
        class="modal fade"
        id="showsuccessmodal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">Settings Successfully saved...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            disabled
            placeholder={props.data.name}
          />
          <small id="emailHelp" class="form-text text-muted">
            You cant change it.
          </small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">URL</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            disabled
            placeholder={props.data.url}
          />
          <small id="emailHelp" class="form-text text-muted">
            You cant change it.
          </small>
        </div>
        <p>Request Method</p>

        <div class="form-group">
          <select
            required
            class="custom-select"
            name="method"
            id="inputGroupSelect01"
            onChange={(e) => {
              setMethod(e.target.value);
            }}
          >
            <option selected>Choose the API request Method</option>
            <option selected={method === "GET"} value="GET">
              GET
            </option>
            <option selected={method === "POST"} value="POST">
              POST
            </option>
            <option selected={method === "PUT"} value="PUT">
              PUT
            </option>
            <option selected={method === "DELETE"} value="DELETE">
              DELETE
            </option>
          </select>
        </div>

        <p>Access</p>
        <div class="form-check">
          <input
            class="form-check-input"
            onChange={(e) => {
              setAccess(e.target.value);
            }}
            type="radio"
            value="public"
            name="access"
            id="flexRadioDefault1"
            checked={access === "public"}
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Public
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            onChange={(e) => {
              setAccess(e.target.value);
            }}
            type="radio"
            value="private"
            name="access"
            id="flexRadioDefault2"
            checked={access === "private"}
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Private
          </label>
        </div>
        <small id="emailHelp" class="form-text text-muted">
          {" "}
          If the access is set a private the URL which you specified only has
          access to it..
        </small>
        <hr />

        <h5>Headers</h5>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Headers</span>
          </div>
          <input
            id="headeradd"
            placeholder="Content-type , application/json"
            type="text"
            aria-label="header"
            class="form-control"
          />

          <div class="input-group-append">
            <button
              class="btn btn-outline-primary"
              type="button"
              id="button-addon2"
              onClick={handleHeaderAdd}
            >
              Add
            </button>
          </div>
        </div>
        <div
          style={{ padding: "5px 5px", margin: "1%" }}
          class="jumbotron"
          id="sdfswdf"
        >
          {loaded ? (
            Object.keys(head).map((data) => {
              return (
                <div class="input-group">
                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item">{data}</li>
                    <li class="list-group-item">{head[data]}</li>
                  </ul>

                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-primary"
                      type="button"
                      id="button-addon2"
                      name={data + "," + head[data]}
                      onClick={(e) => {
                        setHead(
                          dotPropImmutable.delete(
                            head,
                            e.target.name.split(",")[0]
                          )
                        );
                      }}
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                    <button
                      class="btn btn-outline-primary"
                      type="button"
                      id="button-addon2"
                      name={data}
                      onClick={(e) => {
                        document.getElementById("headeradd").value =
                          data + "," + head[data];
                      }}
                    >
                      <i class="far fa-edit"></i>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>skdjfbksjdbf</p>
          )}
        </div>
        <pre class="brush: json">
          {JSON.stringify({ header: head }, undefined, 3)}
        </pre>
        <hr />
        <h5>Body</h5>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Body</span>
          </div>
          <input
            id="bodyadd"
            placeholder="Content-type , application/json"
            type="text"
            aria-label="header"
            class="form-control"
          />

          <div class="input-group-append">
            <button
              class="btn btn-outline-primary"
              type="button"
              id="button-addon2"
              onClick={handleBodyAdd}
            >
              Add
            </button>
          </div>
        </div>
        <div
          style={{ padding: "5px 5px", margin: "1%" }}
          class="jumbotron"
          id="sdfswdf"
        >
          {loaded ? (
            Object.keys(body).map((data) => {
              return (
                <div class="input-group">
                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item">{data}</li>
                    <li class="list-group-item">{body[data]}</li>
                  </ul>

                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-primary"
                      type="button"
                      id="button-addon2"
                      name={data + "," + body[data]}
                      onClick={(e) => {
                        setBody(
                          dotPropImmutable.delete(
                            body,
                            e.target.name.split(",")[0]
                          )
                        );
                      }}
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                    <button
                      class="btn btn-outline-primary"
                      type="button"
                      id="button-addon2"
                      name={data}
                      onClick={(e) => {
                        document.getElementById("bodyadd").value =
                          data + "," + body[data];
                      }}
                    >
                      <i class="far fa-edit"></i>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>skdjfbksjdbf</p>
          )}
        </div>
        <pre class="brush: json">{JSON.stringify(body, undefined, 3)}</pre>
        <hr />

        <h5>Params</h5>

        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Params</span>
          </div>
          <input
            id="paramsadd"
            placeholder="Content-type , application/json"
            type="text"
            aria-label="header"
            class="form-control"
          />

          <div class="input-group-append">
            <button
              class="btn btn-outline-primary"
              type="button"
              id="button-addon2"
              onClick={handleParamsAdd}
            >
              Add
            </button>
          </div>
        </div>
        <div
          style={{ padding: "5px 5px", margin: "1%" }}
          class="jumbotron"
          id="sdfswdf"
        >
          {loaded ? (
            Object.keys(params).map((data) => {
              return (
                <div class="input-group">
                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item">{data}</li>
                    <li class="list-group-item">{params[data]}</li>
                  </ul>

                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-primary"
                      type="button"
                      id="button-addon2"
                      name={data + "," + params[data]}
                      onClick={(e) => {
                        setParams(
                          dotPropImmutable.delete(
                            params,
                            e.target.name.split(",")[0]
                          )
                        );
                      }}
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                    <button
                      class="btn btn-outline-primary"
                      type="button"
                      id="button-addon2"
                      name={data}
                      onClick={(e) => {
                        document.getElementById("paramsadd").value =
                          data + "," + params[data];
                      }}
                    >
                      <i class="far fa-edit"></i>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>skdjfbksjdbf</p>
          )}
        </div>
        <pre class="brush: json">{JSON.stringify(params, undefined, 3)}</pre>

        <hr />
        {saved ? (
          <button
            type="button"
            class="btn btn-primary btn-md"
            onClick={SendDataToServer}
          >
            {" "}
            Save{" "}
          </button>
        ) : (
          <button class="btn btn-primary" type="button" disabled>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>{" "}
            Saving...
          </button>
        )}
      </div>
    </div>
  );
}
export default Settings;
