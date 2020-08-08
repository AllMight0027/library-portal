import React from "react";
import Navigation from "./Navigation";
import { isAuthenticated } from "../auth/helper";

const Base = ({
  title = "",
  description = "",
  className = "bg-dark text-white p-4",
  children,
}) => (
  <div>
    {isAuthenticated() && <Navigation />}
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <br />
    <br />
    {/* <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-info text-white text-center py-3">
        <h5>Click to reach out</h5>
        <a
          href="mailto: AllMight0027@gmail.com"
          className="btn btn-sm btn-warning text-dark"
          data-toggle="button"
          aria-pressed="false"
          autocomplete="off"
        >
          Contact US
        </a>
      </div>
      <div className="container">
        <span className="text-muted">
          © <span className="text-white">AllMight0027</span>
        </span>
      </div>
</footer>*/}
  </div>
);

export default Base;
