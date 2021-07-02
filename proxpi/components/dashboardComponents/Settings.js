import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import dotPropImmutable from "dot-prop-immutable";
import axios from "axios";
import "../../assets/settings.css";
import "../../assets/fonts.css";
import swal from "sweetalert2/dist/sweetalert2.all.min.js";
import { ResourceList, Button } from "@auth0/cosmos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/home.css"
function Settings(props) {
  var arr = [];
  const [head, setHead] = useState([]);
  const [params, setParams] = useState([]);
  const [body, setBody] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [access, setAccess] = useState();
  const [method, setMethod] = useState();
  const [key, setkey] = useState();
  const [privateUrl, setPrivateUrl] = useState("");
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
            privateurlP: privateUrl,
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
      toast.success("Added Headers , dont forget to save", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      toast.success("Added Params , dont forget to save", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      toast.success("Added Body , dont forget to save", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      new swal("Nothing to add", "", "error");
    }
  }
  function handlePrivateUrlAdd() {
    privateurl = document.getElementById("privateurl").value;
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    if (privateurl) {
      if (pattern.test(privateurl)) {
        setPrivateUrl(privateurl);
        toast.success("Added URL , dont forget to save", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        new swal("Your URL format is wrong", "", "error");
      }
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
          setPrivateUrl(data.data.proxpidata.privateUrl || "");
          setkey(data.data.proxpidata.key);
          setLoaded(true);
        }
      });
  }
  useEffect(() => {
    getProxpiUser();
  }, []);

  return (
    <div
    class="settings-container mainbody nmorphism-container"
      
    >
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
        <h1 style={{textDecoration:"underline"}} class="fontclassnavitems">
          Settings
        </h1>
       
        <div class="form-group">
          <h5 class="fontclassnav" style={{ color: "white" }}>
            Name
          </h5>
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
          <h5 class="fontclassnav" style={{ color: "white" }}>
            URL
          </h5>
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
        <h5 class="fontclassnav" style={{ color: "white" }}>
          Request Method
        </h5>

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
<hr/>
        <h5 class="fontclassnav" style={{ color: "white" }}>
          Access
        </h5>
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
        <h5 class="fontclassnav" style={{ color: "white" }}>
          Private Access URL
        </h5>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">
              Default
            </span>
          </div>
          <input
            type="text"
            id="privateurl"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            value={privateUrl || ""}
            onChange={(e) => {
              setPrivateUrl(e.target.value);
            }}
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-primary"
              type="button"
              id="button-addon2"
              onClick={handlePrivateUrlAdd}
            >
              Add
            </button>
          </div>
        </div>

   
        <small id="emailHelp" class="form-text text-muted">
          {" "}
          The Private Access URL is the URL which will only have permission to
          access the Proxy API . If the Access is set to public the permissions
          shall not apply. The restriction will only be made if the access is
          Private.
        </small>
        <hr />
        <h5 class="fontclassnav" style={{ color: "white" }}>
          Headers
        </h5>
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

        {loaded ? (
          Object.keys(head).map((data) => {
            return (
              <ResourceList.Item
                title={data}
                style={{
                  backgroundColor: "#2b303a",
                  margin: "2%",
                  color: "white",
                  textTransform: "none",
                }}
                subtitle="Headers"
                icon="lock"
                actions={[
                  <Button
                    icon="delete"
                    name={data + "," + head[data]}
                    onClick={(e) => {
                      setHead(dotPropImmutable.delete(head, data));
                      toast.warn("Deleted Header", {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    }}
                    label="Delete"
                  />,
                  <Button
                    icon="pencil"
                    name={data}
                    onClick={(e) => {
                      document.getElementById("headeradd").value =
                        data + "," + head[data];
                    }}
                    label="Edit"
                  />,
                ]}
              >
                {head[data]}
              </ResourceList.Item>
            );
          })
        ) : (
          <p>Loading.....</p>
        )}

        <hr />
        <h5 class="fontclassnav" style={{ color: "white" }}>
          Body
        </h5>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Body</span>
          </div>
          <input
            id="bodyadd"
            placeholder="name,proxpi"
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
      
          {loaded ? (
            Object.keys(body).map((data) => {
              return (
                <ResourceList.Item
                title={data}
                style={{
                  backgroundColor: "#2b303a",
                  margin: "2%",
                  color: "white",
                  textTransform: "none",
                }}
                subtitle="Body"
                icon="lock"
                actions={[
                  <Button
                    icon="delete"
                    name={data + "," + body[data]}
                    onClick={(e) => {
                      setBody(dotPropImmutable.delete(body, data));
                      toast.warn("Deleted Body", {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                      
                    }}
                    label="Delete"
                  />,
                  <Button
                    icon="pencil"
                    name={data}
                    onClick={(e) => {
                      document.getElementById("bodyadd").value =
                        data + "," + body[data];
                    }}
                    label="Edit"
                  />,
                ]}
              >
                {body[data]}
              </ResourceList.Item>
              );
            })
          ) : (
            <p>Loading.....</p>
          )}
   

        <hr />

        <h5 class="fontclassnav" style={{ color: "white" }}>
          Params
        </h5>

        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Params</span>
          </div>
          <input
            id="paramsadd"
            placeholder="awesome,true"
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
       
          {loaded ? (
            Object.keys(params).map((data) => {
              return (
                <ResourceList.Item
                title={data}
                style={{
                  backgroundColor: "#2b303a",
                  margin: "2%",
                  color: "white",
                  textTransform: "none",
                }}
                subtitle="Params"
                icon="lock"
                actions={[
                  <Button
                    icon="delete"
                    name={data + "," + params[data]}
                    onClick={(e) => {
                      setParams(dotPropImmutable.delete(params, data));
                      toast.warn("Deleted Params", {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    }}
                    label="Delete"
                  />,
                  <Button
                    icon="pencil"
                    name={data}
                    onClick={(e) => {
                      document.getElementById("paramsadd").value =
                        data + "," + head[data];
                    }}
                    label="Edit"
                  />,
                ]}
              >
                {params[data]}
              </ResourceList.Item>
              );
            })
          ) : (
            <p>Loading.....</p>
          )}
     

        <hr />
        {saved ? (
          <button
            type="button"
          
            onClick={SendDataToServer}
            style={{ marginLeft: "10px" }}
            class="btn btn-primary btn-lg"
          >
            {" "}
            Save{" "}
          </button>
        ) : (
          <button class="btn btn-primary btn-lg" type="button" disabled>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              style={{ marginLeft: "10px" }}
              aria-hidden="true"
            ></span>{" "}
            Saving...
          </button>
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
export default Settings;
