import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllBooks, deleteBook } from "./helper/userapicalls";
import { API } from "../backend";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllBooks().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBooks(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisBook = (bookId) => {
    deleteBook(bookId, user._id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          preload();
        }
      })
      .catch((e) => console.log(e));
  };

  const goback = () => (
    <Link className="btn btn-warning" to="/dashboard">
      Back
    </Link>
  );

  return (
    <Base title="Manage Books" description="Update and Delete Books Here">
      <div className="container">
        {goback()}
        <br />
        <h3 className="text-center mt-4">All Books</h3>
        <br />
        <br />
        <div className="row">
          {books.map((book, index) => {
            return (
              <div className="col-xl-4 col-sm-12 col-md-6 mt-4">
                <div className="card mt-2 h-100">
                  <div className="card-body">
                    <div className="row mb-1">
                      <div className="col-12 text-center">
                        <img
                          className="card-img-top"
                          src={`${API}book/photo/${book._id}`}
                          alt={"Card cap"}
                          style={{ height: "225px", width: "225px" }}
                        />
                      </div>
                    </div>
                    <h5 className="card-title text-dark mt-2">{book.name}</h5>
                    <p className="card-text text-dark">{`Author: ${book.author}`}</p>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6 col-sm-12">
                          <Link
                            to={`/book/update/${book._id}`}
                            className="btn btn-warning btn-block mt-1"
                          >
                            Update
                          </Link>
                        </div>
                        <div className="col-md-6 col-sm-12 mt-1">
                          <button
                            onClick={() => {
                              deleteThisBook(book._id);
                            }}
                            className="btn btn-danger btn-block"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
