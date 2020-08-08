import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Dashboard = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(isAuthenticated().user);
  }, []);
  const adminLeft = () => {
    return (
      <div className="card">
        <h5 className="card-header bg-dark text-white text-center">
          Admin Navigation
        </h5>
        <ul className="list-group">
          <li className="list-group-item text-info font-weight-bold">
            <Link className="text-info" to="/create/book">
              Add Book
            </Link>
          </li>
          <li className="list-group-item text-info font-weight-bold">
            <Link className="text-info" to="/books">
              Manage Books
            </Link>
          </li>
          <li className="list-group-item text-info font-weight-bold">
            <Link className="text-info" to="/create/genre">
              Add Genre
            </Link>
          </li>
          <li className="list-group-item text-info font-weight-bold">
            <Link className="text-info" to="/genres">
              Manage Genres
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRight = () => {
    return (
      <div className="card">
        <h5 className="card-header bg-dark text-white text-center">
          Admin Information
        </h5>
        <ul className="list-group">
          <li className="list-group-item font-weight-bold">
            <h5>
              <span className="badge badge-info mr-2">Name</span>
              {user.name}
            </h5>{" "}
          </li>
          <li className="list-group-item font-weight-bold">
            <h5>
              <span className="badge badge-info mr-2">Email</span>
              {user.email}
            </h5>{" "}
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base className="container bg-info p-4" title="Admin Dashboard">
      <div className="row">
        <div className="col-md-3">{adminLeft()}</div>
        <div className="col-md-9">{adminRight()}</div>
      </div>
    </Base>
  );
};

export default Dashboard;
