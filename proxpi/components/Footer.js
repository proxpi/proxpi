import React, { Component, useEffect } from "react";
import "../assets/footer.css";
const Footer = () => (
  <footer style={{ margin: "1% 4.5%" }} class="pt-4 my-md-5 pt-md-5 border-top">
    <div class="row">
      <div class="col-12 col-md">
        <img
          class="mb-2"
          src="https://avatars.githubusercontent.com/u/84428745?s=400&u=4c7cc5b97236c44f0aea44f2b477cdee20e13953&v=4"
          alt=""
          width="80"
          height="80"
        />

        <small class="d-block mb-3 text-muted">
          &copy; 2021–{new Date().getFullYear()} ProxPi
        </small>
        <div
          class="socialicons"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <a>
            <i class="fab fa-github fa-2x"></i>
          </a>
          <a>
            <i class="fab fa-instagram fa-2x"></i>
          </a>
          <a>
            <i class="fab fa-twitter fa-2x"></i>
          </a>
          <a>
            <i class="fab fa-linkedin fa-2x"></i>
          </a>
        </div>
      </div>
     
      <div class="col-6 col-md">
      <hr></hr>
        <h5>Product</h5>
        <ul class="list-unstyled text-small">
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Cool stuff
            </a>
          </li>
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Random feature
            </a>
          </li>
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Team feature
            </a>
          </li>
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Stuff for developers
            </a>
          </li>
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Another one
            </a>
          </li>
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Last time
            </a>
          </li>
        </ul>
      </div>
      <div class="col-6 col-md">
      <hr></hr>
        <h5>Resources</h5>
        <ul class="list-unstyled text-small">
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Resource
            </a>
          </li>
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Resource name
            </a>
          </li>
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Another resource
            </a>
          </li>
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Final resource
            </a>
          </li>
        </ul>
      </div>
      <div class="col-6 col-md">
      <hr></hr>
        <h5>Developers</h5>
        <ul class="list-unstyled text-small">
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Team
            </a>
          </li>
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Locations
            </a>
          </li>
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Privacy
            </a>
          </li>
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Terms
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);
export default Footer;
