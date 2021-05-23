import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import "../assets/navbar.css";
function Btn() {
  const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated } =
    useAuth0();

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
      <a class="navbar-brand" href="#">
        <img
          src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
          width="30"
          height="30"
          alt=""
        />
      </a>
      <a class="navbar-brand" href="#">
        ProxPi
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a
              class="nav-link"
              data-bs-toggle="collapse"
              data-bs-target=".navbar-collapse.show"
              href="#"
            >
              <Link to="/">Home</Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <Link to="/pricing">Pricing</Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              {isAuthenticated ? <Link to="/dashboard">Dashboard</Link> : ""}
            </a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          {isAuthenticated ? (
            <button class="btn btn-outline-success" onClick={logout}>
              Logout
            </button>
          ) : (
            <button class="btn btn-outline-success" onClick={loginWithRedirect}>
              Login
            </button>
          )}
        </form>
      </div>
    </nav>
  );
}

export default Btn;
