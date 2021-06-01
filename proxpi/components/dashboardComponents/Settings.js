import React from "react";
function Settings(props) {
  return (
    <div style={{ margin: "2% 6%" }}>
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
          >
            <option selected>Choose the API request Method</option>
            <option selected={props.data.method === "GET"} value="GET">
              GET
            </option>
            <option selected={props.data.method === "POST"} value="POST">
              POST
            </option>
            <option selected={props.data.method === "PUT"} value="PUT">
              PUT
            </option>
            <option selected={props.data.method === "DELETE"} value="DELETE">
              DELETE
            </option>
          </select>
        </div>

        <p>Access</p>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            value="public"
            name="access"
            id="flexRadioDefault1"
            checked={props.data.access === "public"}
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Public
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            value="private"
            name="access"
            id="flexRadioDefault2"
            checked={props.data.access === "private"}
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
        <p>Headers</p>
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" placeholder="First name" />
          </div>
          <div class="col">
            <input type="text" class="form-control" placeholder="Last name" />
          </div>
          <div class="col">
            <button class="btn btn-md btn-primary">Add</button>
          </div>
        </div>
        <hr />
        <p>Body</p>
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" placeholder="First name" />
          </div>
          <div class="col">
            <input type="text" class="form-control" placeholder="Last name" />
          </div>
          <div class="col">
            <button class="btn btn-md btn-primary">Add</button>
          </div>
        </div>
        <hr />
        <p>Params</p>
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" placeholder="First name" />
          </div>
          <div class="col">
            <input type="text" class="form-control" placeholder="Last name" />
          </div>
          <div class="col">
            <button class="btn btn-md btn-primary">Add</button>
          </div>
        </div>
        <hr />
        <p>Data</p>
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" placeholder="First name" />
          </div>
          <div class="col">
            <input type="text" class="form-control" placeholder="Last name" />
          </div>
          <div class="col">
            <button class="btn btn-md btn-primary">Add</button>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
export default Settings;
