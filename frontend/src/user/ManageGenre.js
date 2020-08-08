import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import { getGenres, deleteGenre } from "./helper/userapicalls";

export default function ManageGenre() {
  const { user, token } = isAuthenticated();

  const [genres, setGenres] = useState([]);

  const preload = () => {
    getGenres().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setGenres(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisGenre = (genreId) => {
    deleteGenre(genreId, user._id, token)
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
    <Base title="Manage Genres">
      <div className="container">
        {goback()}
        {genres.map((genre, index) => {
          return (
            <div key={`~${index}`} className="row mt-4 bg-info p-2 rounded">
              <div className="col-4">
                <h5 className="text-dark font-weight-bold">
                  {index + 1}) {genre.name}
                </h5>
              </div>
              <div className="col-4">
                <Link
                  to={`/genre/update/${genre._id}`}
                  className="btn btn-warning"
                >
                  Update
                </Link>
              </div>
              <div className="col-4">
                <button
                  onClick={() => {
                    deleteThisGenre(genre._id);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Base>
  );
}
