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

        <hr></hr>
        <div
          class="socialicons"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <a href="https://github.com/proxpi">
            <i class="fab fa-github fa-2x"></i>
          </a>
          <a href="https://instagram.com/proxpi.tech">
            <i class="fab fa-instagram fa-2x"></i>
          </a>
          <a href="https://twitter.com/proxpi_tech">
            <i class="fab fa-twitter fa-2x"></i>
          </a>
          <a href="https://linkedin.com/company/proxpi">
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
              ProxPi
            </a>
          </li>
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Access Tokens(Comming soon)
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
             Documentation
            </a>
          </li>
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Analytics
            </a>
          </li>
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              IP/URL Blocking
            </a>
          </li>
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              OSS Guide
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
              Open Source
            </a>
          </li>
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Contributors
            </a>
          </li>
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Contributing Guide
            </a>
          </li>
          <li class="mb-1">
            <a class="link-secondary text-decoration-none" href="#">
              Code documentation
            </a>
          </li>
        </ul>
      </div>
    </div>
    <hr></hr>
    <h6 style={{textAlign:"center"}} class="d-block mb-3 text-muted">
    <i class="far fa-copyright"></i> 2021–{new Date().getFullYear()} ProxPi
        </h6>
  </footer>
);
export default Footer;
