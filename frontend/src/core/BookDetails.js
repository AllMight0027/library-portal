import React, { useEffect, useState } from "react";
import {
  getBook,
  getGenre,
  updateBook,
  getAllIssues,
} from "./helper/coreapicalls";
import { API } from "../backend";
import Base from "./Base";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

const BookDetails = ({ match, history }) => {
  const { user, token } = isAuthenticated();
  const [book, setBook] = useState({});
  const [genre, setGenre] = useState({});
  const [reload, setReload] = useState(false);
  const [previousIssues, setPreviousIssues] = useState([]);

  const sendMaintainance = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.set("status", "Maintenance");
    updateBook(book._id, user._id, token, formData).then((data) => {
      console.log(data);
      setReload(!reload);
    });
  };
  const issueReturn = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.set("status", "Available");
    updateBook(book._id, user._id, token, formData).then((data) => {
      console.log(data);
      setReload(!reload);
    });
  };

  const backFromMaintainance = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.set("status", "Available");
    updateBook(book._id, user._id, token, formData).then((data) => {
      console.log(data);
      setReload(!reload);
    });
  };

  const loadData = () => {
    getBook(match.params.bookId)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setBook(data);
          getGenre(data.genre).then((data) => {
            if (data.error) {
              console.log(data.error);
            } else {
              setGenre(data);
            }
          });
          console.log(data);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    loadData();
    getAllIssues(user._id, match.params.bookId).then((data) => {
      console.log(data);
      setPreviousIssues(data);
    });
    // eslint-disable-next-line
  }, [reload]);

  const src = `${API}book/photo/${book._id}`;

  const goback = () => (
    <Link className="btn text-dark btn-warning mt-3" to="/home">
      Back
    </Link>
  );

  return (
    <Base title={book.name} description="">
      <div className="container-fluid">
        {goback()}
        <div className="row mt-3">
          <div className="col-sm-4">
            <img
              src={src}
              alt="Unavailable"
              style={{ maxHeight: "300px", maxWidth: "300px" }}
              className="mb-3 rounded text-black"
            />
          </div>
          <div className="col-sm-7 ml-1">
            <h6>Author:</h6>
            <p>{book.author}</p>
            <h6>Genre:</h6>
            <p>{genre.name}</p>
            <h6>Descripttion:</h6>
            <p>{book.description}</p>
            <h6>Status:</h6>
            <p>{book.status}</p>
            {book.status === "Available" && (
              <Link
                className="btn text-dark btn-info mt-3"
                to={`/book/issue/${book._id}`}
              >
                Issue Book
              </Link>
            )}
            <br />
            {book.status === "Available" && (
              <button
                className="btn text-dark btn-info mt-3"
                onClick={sendMaintainance}
              >
                Send for Maintainance
              </button>
            )}
            {book.status === "Maintenance" && (
              <button
                className="btn text-dark btn-info mt-3"
                onClick={backFromMaintainance}
              >
                Back From Maintainance
              </button>
            )}
            {book.status === "Issued" && (
              <button
                className="btn text-dark btn-info mt-3"
                onClick={issueReturn}
              >
                Return the book
              </button>
            )}

            <br />
            <br />
            <h5>Previous Issues</h5>
            <div className="row">
              <div className="col-4">Name</div>
              <div className="col-4">Phone</div>
              <div className="col-4">Issued On</div>
            </div>
            <br />
            {previousIssues &&
              previousIssues.length !== 0 &&
              previousIssues.map((issue, index) => {
                return (
                  <div className="row mb-2">
                    <div className="col-4">{issue.name}</div>
                    <div className="col-4">{issue.phone}</div>
                    <div className="col-4">
                      {issue.issuedOn.substring(0, 24)}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default withRouter(BookDetails);
