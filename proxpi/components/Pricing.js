import React, { Component, useEffect } from "react";
import "../assets/pricing.css";
function Pricing() {
  return (
    <div className="container py-3">
      <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h1 class="display-4 fw-normal">Pricing</h1>
        <p class="fs-5 text-muted">
          All the basic features of ProxPi are Free for all (max 6 ProxPi's) .
          For more than 6 ProxPi's a Pro Plan is required and you can pay me
          whatever amount you can.
        </p>
      </div>
      <main>
        <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
          <div align="center" class="col colorbox">
            <div class="card mb-4 rounded-3 shadow-sm border-primary coloretc nmorphism-container colorbox">
              <div class="card-header py-3 border-primary">
                <h4 class="my-0 fw-normal">Free</h4>
              </div>
              <div class="card-body">
                <h1 class="card-title pricing-card-title">
                  $0<small class="text-muted fw-light">/mo</small>
                </h1>
                <ul class="list-unstyled mt-3 mb-4">
                  <li>6 ProxPi's</li>
                  <li>Analytics</li>

                  <li>IP/URL blocking</li>
                </ul>
                <button
                  type="button"
                  class="w-100 btn btn-lg btn-outline-primary specialbutton"
                >
                  Sign up for free
                </button>
              </div>
            </div>
          </div>

          <div align="center" class="col">
            <div class="card mb-4 rounded-3 shadow-sm border-primary coloretc nmorphism-container">
              <div class="card-header py-3 text-white bg-primary border-primary">
                <h4 class="my-0 fw-normal">Pro</h4>
              </div>
              <div class="card-body">
                <h1 class="card-title pricing-card-title">
                  $5<small class="text-muted fw-light">/mo</small>
                </h1>
                <ul class="list-unstyled mt-3 mb-4">
                  <li>∞ ProxPi's</li>
                  <li>Everything in free plan</li>
                  <li>Dedicated Support</li>
                </ul>
                <button type="button" class="w-100 btn btn-lg btn-primary">
                  Contact us
                </button>
              </div>
            </div>
          </div>
          <div align="center" class="col">
            <div class="card mb-4 rounded-3 shadow-sm coloretc nmorphism-container border-primary">
              <div class="card-header py-3 text-white bg-primary border-primary">
                <h4 class="my-0 fw-normal">Self Hosted</h4>
              </div>
              <div class="card-body">
                <h1 class="card-title pricing-card-title">
                  ?<small class="text-muted fw-light">/mo</small>
                </h1>
                <ul class="list-unstyled mt-3 mb-4">
                  <li>Self Host Support</li>
                  <li>Help in hosting</li>
                  <li>Special Discord Server</li>
                </ul>
                <button type="button" class="w-100 btn btn-lg btn-primary">
                  Contact us
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Pricing;
