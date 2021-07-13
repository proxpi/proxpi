import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import "../assets/navbar.css";
import "../assets/fonts.css";
import { Button, Icon } from "@auth0/cosmos";
function Btn() {
  const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated } =
    useAuth0();

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
      <a class="navbar-brand" href="#">
        <img
          src="https://avatars.githubusercontent.com/u/84428745?s=400&u=4c7cc5b97236c44f0aea44f2b477cdee20e13953&v=4"
          width="50"
          height="50"
          alt=""
        />
      </a>
      <a
        style={{ color: "#54d6b7", fontSize: "26px", marginTop: "0px" }}
        class="navbar-brand fontclassnav"
        href="#"
      >
        <b>ProxPi</b>
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
          <li class="nav-item active clickable">
            <Link
              style={{ textDecoration: "none" }}
              class="nav-link fontclassnavitems"
              data-bs-toggle="collapse"
              style={{ color: "white", marginTop: "0px" }}
              data-bs-target=".navbar-collapse.show"
              href="#"
              to="/"
            >
              <b>Home</b>
            </Link>
          </li>
          <li class="nav-item clickable">
            {isAuthenticated ? (
              <Link
                style={{ color: "white", marginTop: "0px" }}
                class="nav-link fontclassnavitems"
                to="/dashboard"
              >
                <b>Dashboard</b>
              </Link>
            ) : (
              ""
            )}
          </li>
          <li class="nav-item clickable">
            <Link
              style={{ color: "white", marginTop: "0px" }}
              class="nav-link fontclassnavitems"
              to="/pricing"
            >
              <b>Pricing</b>
            </Link>
          </li>
          <li class="nav-item clickable">
            <Link
              style={{ color: "white", marginTop: "0px" }}
              class="nav-link fontclassnavitems"
              to="/pricing"
            >
              <b>Docs</b>
            </Link>
          </li>
          <li class="nav-item dropdown">
            <a
              style={{ color: "white", marginTop: "0px" }}
              class="nav-link dropdown-toggle fontclassnavitems"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <b>More</b>
            </a>
            <div
              class="dropdown-menu clickable"
              aria-labelledby="navbarDropdown"
            >
              <a class="dropdown-item clickable" href="#">
                Support
              </a>
              <a class="dropdown-item clickable" href="#">
                Open Source
              </a>
              <a class="dropdown-item clickable" href="#">
                Contribute
              </a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item clickable" href="#">
                Help
              </a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          {isAuthenticated ? (
            <Button
              icon="logout"
              style={{ backgroundColor: "#226f6c", border: "none" }}
              appearance="primary"
              onClick={logout}
            >
              Logout
            </Button>
          ) : (
            <Button
              icon="login"
              style={{ backgroundColor: "#226f6c", border: "none" }}
              appearance="primary"
              onClick={loginWithRedirect}
            >
              Login
            </Button>
          )}
        </form>
      </div>
    </nav>
  );
}

export default Btn;
