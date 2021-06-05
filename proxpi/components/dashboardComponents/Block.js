import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function Block(props) {
  const { getAccessTokenSilently } = useAuth0();
  const [blockedip, setBlockedip] = useState([]);
  const [blockedsite, setBlockedsite] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(true);
  const [key, setkey] = useState();
  function handleBanIpAdd() {
    bannedip = document.getElementById("ipadd").value;
    if (bannedip) {
      if (
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
          bannedip
        )
      ) {
        setBlockedip([...blockedip, bannedip]);
      } else {
        console.log("wrong ip");
      }
      document.getElementById("ipadd").value = "";
    } else {
      console.log("addedno");
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
      } else {
        console.log("wrong ip");
      }
      document.getElementById("urladd").value = "";
    } else {
      console.log("addedno");
    }
  }
  console.log(blockedip);
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
    <div>
      <h5>Headers</h5>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Blocked IP's</span>
        </div>
        <input
          id="ipadd"
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
            onClick={handleBanIpAdd}
          >
            Add
          </button>
        </div>
      </div>
      <div id="sdfswdf">
        {loaded ? (
          blockedip.map((data) => {
            return (
              <div style={{ width: "50%" }} class="input-group">
                <ul class="list-group list-group-horizontal">
                  <li class="list-group-item">{data}</li>
                </ul>

                <div class="input-group-append">
                  <button
                    class="btn btn-outline-primary"
                    type="button"
                    id="button-addon2"
                    name={data}
                    onClick={(e) => {
                      setBlockedip(
                        blockedip.filter(function (ips) {
                          return ips !== e.target.name;
                        })
                      );
                    }}
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>skdjfbksjdbf</p>
        )}
      </div>
      <h5>Blocked URL's</h5>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Blocked URL's</span>
        </div>
        <input
          id="urladd"
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
            onClick={handleURLAdd}
          >
            Add
          </button>
        </div>
      </div>
      <div id="sdfswdf">
        {loaded ? (
          blockedsite.map((dataU) => {
            return (
              <div style={{ width: "50%" }} class="input-group">
                <ul class="list-group list-group-horizontal">
                  <li class="list-group-item">{dataU}</li>
                </ul>

                <div class="input-group-append">
                  <button
                    class="btn btn-outline-primary"
                    type="button"
                    id="button-addon2"
                    name={dataU}
                    onClick={(e) => {
                      setBlockedsite(
                        blockedsite.filter(function (url) {
                          return url !== e.target.name;
                        })
                      );
                    }}
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>skdjfbksjdbf</p>
        )}
      </div>
      {saved ? (
        <button type="button" class="btn btn-primary btn-md">
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
  );
}
export default Block;
