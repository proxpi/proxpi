import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import "../assets/main.css";
function Loading() {
  return (
    <Spinner
      style={{ position: "fixed", top: "50%", left: "50%" }}
      animation="grow"
      variant="primary"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}
export default Loading;
