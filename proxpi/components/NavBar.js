import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import "../assets/navbar.css";
import "../assets/fonts.css";
import { Button } from "@auth0/cosmos";
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
      <a
        style={{ color: "white", fontSize: "26px", marginTop: "5px" }}
        class="navbar-brand fontclassnav"
        href="#"
      >
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
            <Link
              style={{ textDecoration: "none" }}
              class="nav-link fontclassnavitems"
              data-bs-toggle="collapse"
              style={{ color: "white", marginTop: "4px" }}
              data-bs-target=".navbar-collapse.show"
              href="#"
              to="/"
            >
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link
              style={{ color: "white", marginTop: "4px" }}
              class="nav-link fontclassnavitems"
              to="/pricing"
            >
              Pricing
            </Link>
          </li>
          <li class="nav-item">
            {isAuthenticated ? (
              <Link
                style={{ color: "white", marginTop: "4px" }}
                class="nav-link fontclassnavitems"
                to="/dashboard"
              >
                Dashboard
              </Link>
            ) : (
              ""
            )}
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          {isAuthenticated ? (
            <Button appearance="primary" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button appearance="primary" onClick={loginWithRedirect}>
              Login
            </Button>
          )}
        </form>
      </div>
    </nav>
  );
}

export default Btn;
