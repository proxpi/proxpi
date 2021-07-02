import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import "../assets/navbar.css";
import "../assets/fonts.css";
import { Button ,Icon} from "@auth0/cosmos";
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
        style={{ color: "white", fontSize: "26px", marginTop: "0px" }}
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
              style={{ color: "white", marginTop: "0px" }}
              data-bs-target=".navbar-collapse.show"
              href="#"
              to="/"
            >
              Home
            </Link>
          </li>
          <li class="nav-item">
            {isAuthenticated ? (
              <Link
                style={{ color: "white", marginTop: "0px" }}
                class="nav-link fontclassnavitems"
                to="/dashboard"
              >
                Dashboard
              </Link>
            ) : (
              ""
            )}
          </li>
          <li class="nav-item">
            <Link
              style={{ color: "white", marginTop: "0px" }}
              class="nav-link fontclassnavitems"
              to="/pricing"
            >
              Pricing
            </Link>
          </li>
          <li class="nav-item">
            <Link
              style={{ color: "white", marginTop: "0px" }}
              class="nav-link fontclassnavitems"
              to="/pricing"
            >
              Docs
            </Link>
          </li>
          
          
          
        </ul>
        <form class="form-inline my-2 my-lg-0">
          {isAuthenticated ? (
            <Button icon="logout" appearance="primary" onClick={logout}>
               Logout
            </Button>
          ) : (
            <Button icon="login"appearance="primary" onClick={loginWithRedirect}>
             Login
            </Button>
          )}
        </form>
      </div>
    </nav>
  );
}

export default Btn;
