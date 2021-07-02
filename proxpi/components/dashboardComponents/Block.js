import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import swal from "sweetalert2/dist/sweetalert2.all.min.js";
import { ResourceList, Button } from "@auth0/cosmos";
import "../../assets/fonts.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/home.css"
function Block(props) {
  const { getAccessTokenSilently } = useAuth0();
  const [blockedip, setBlockedip] = useState([]);
  const [blockedsite, setBlockedsite] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(true);
  const [key, setkey] = useState();

  async function sendBanDataToServer() {
    const tokenBDTS = await getAccessTokenSilently();
    //CBUI means Banned Data To Server
    setSaved(false);
    await axios
      .post(
        "/update/bannedsettings",
        {
          body: {
            blockedipP: blockedip,
            blockedsiteP: blockedsite,
            keyP: key,
          },
        },
        { headers: { authorization: `Bearer ${tokenBDTS}` } }
      )
      .then((resp) => {
        if (resp.data.data == undefined) {
          $("#showbansuccessmodal").modal("show");
          setSaved(true);
        }
      });
  }

  function handleBanIpAdd() {
    bannedip = document.getElementById("ipadd").value;
    if (bannedip) {
      if (
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
          bannedip
        )
      ) {
        setBlockedip([...blockedip, bannedip]);
        toast.success("Added IP, dont forget to save", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        new swal("Your IP format is Incorrect", "", "error");
      }
      document.getElementById("ipadd").value = "";
    } else {
      new swal("Nothing to add", "", "error");
    }
  }

  function handleURLAdd() {
    bannedurl = document.getElementById("urladd").value;
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    if (bannedurl) {
      if (pattern.test(bannedurl)) {
        setBlockedsite([...blockedsite, bannedurl]);
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
      document.getElementById("urladd").value = "";
    } else {
      new swal("Nothing to add", "", "error");
    }
  }

  async function getBlockData() {
    const tokenGPBI = await getAccessTokenSilently();
    //GPA means Get Proxpi Blockedinfo
    await axios
      .request({
        method: "GET",
        url: `/get/blockers/${window.location.pathname.split("/")[3]}`,
        headers: {
          Authorization: `Bearer ${tokenGPBI}`,
        },
      })
      .then((data) => {
        if (!data.data.success == false) {
        } else {
          setBlockedip(data.data.bandata.blocked_ip || []);
          setBlockedsite(data.data.bandata.blocked_site || []);

          setkey(data.data.bandata.key);
          setLoaded(true);
        }
      });
  }

  useEffect(() => {
    getBlockData();
  }, []);

  return (
    <>
      <div
      class="mainbody nmorphism-container"
        
      >
        <div
          class="modal fade model-sm"
          id="showbansuccessmodal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header"></div>
              <div class="modal-body">Ban Settings Successfully saved...</div>
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
        <h4 style={{ margin: "10px" }} class="fontclassnavitems">
          BLocked IP's
        </h4>
        <hr />
        <div style={{ margin: "1%", width: "96%" }} class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">IP Address</span>
          </div>
          <input
            id="ipadd"
            placeholder="256.256.256.256"
            type="text"
            aria-label="header"
            class="form-control"
          />

          <div class="input-group-append">
            <button
              class="btn btn-outline-primary"
              type="button"
              id="button-addon2"
              onClick={handleBanIpAdd}
            >
              Add
            </button>
          </div>
        </div>

        {loaded ? (
          blockedip.map((data) => {
            return (
              <ResourceList.Item
                title={data}
                style={{
                  backgroundColor: "#2b303a",
                  margin: "2%",
                  color: "white",
                }}
                icon="ip-address"
                actions={[
                  <Button
                    icon="delete"
                    name={data}
                    onClick={(e) => {
                      setBlockedip(
                        blockedip.filter(function (ips) {
                          return ips !== data;
                        })
                      );
                    }}
                    label="Delete"
                  />,
                ]}
              />
            );
          })
        ) : (
          <p>Loading.....</p>
        )}

        <hr />
        <h4 style={{ margin: "10px" }} class="fontclassnavitems">
          BLocked URL's
        </h4>
        <hr />
        <div style={{ margin: "1%", width: "96%" }} class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">URL</span>
          </div>
          <input
            id="urladd"
            placeholder="https://example.com"
            type="text"
            aria-label="header"
            class="form-control"
          />

          <div class="input-group-append">
            <button
              class="btn btn-outline-primary"
              type="button"
              id="button-addon2"
              onClick={handleURLAdd}
            >
              Add
            </button>
          </div>
        </div>

        {loaded ? (
          blockedsite.map((dataU) => {
            return (
              <ResourceList.Item
                title={dataU}
                style={{
                  backgroundColor: "#2b303a",
                  margin: "2%",
                  color: "white",
                }}
                icon="link"
                actions={[
                  <Button
                    icon="delete"
                    name={dataU}
                    onClick={(e) => {
                      setBlockedsite(
                        blockedsite.filter(function (url) {
                          return url !== dataU;
                        })
                      );
                    }}
                    label="Delete"
                  />,
                ]}
              />
            );
          })
        ) : (
          <p>Loading.....</p>
        )}

        {saved ? (
          <button
            type="button"
            onClick={sendBanDataToServer}
            style={{ marginLeft: "10px" }}
            class="btn btn-primary btn-lg"
          >
            {" "}
            Save{" "}
          </button>
        ) : (
          <button
            class="btn btn-primary btn-lg"
            type="button"
            style={{ marginLeft: "10px" }}
            disabled
          >
            <span
              class="spinner-border spinner-border-lg"
              role="status"
              aria-hidden="true"
            ></span>{" "}
            Saving...
          </button>
        )}
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
      
    </>
  );
}
export default Block;
