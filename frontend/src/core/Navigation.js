import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper/index";

const currentTab = (history, path) => {
  if (history.location.pathname === path) return { color: "#5bc0de" };
  else return { color: "#FFFFFF" };
};

const Navigation = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link
          style={currentTab(history, "/home")}
          className="nav-link"
          to="/home"
        >
          Home
        </Link>
      </li>

      {isAuthenticated() && (
        <li className="nav-item">
          <Link
            style={currentTab(history, "/dashboard")}
            className="nav-link"
            to="/dashboard"
          >
            Dashboard
          </Link>
        </li>
      )}
      {!isAuthenticated() && (
        <li className="nav-item">
          <Link style={currentTab(history, "/")} className="nav-link" to="/">
            Signin
          </Link>
        </li>
      )}
      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link text-warning"
            style={{ cursor: "pointer" }}
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Navigation);
