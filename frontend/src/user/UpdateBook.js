import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import { getGenres, updateBook, getBook } from "./helper/userapicalls";

const UpdateBook = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setvalues] = useState({
    name: "",
    description: "",
    author: "",
    genre: "",
    photo: "",
    genres: "",
    error: "",
    createdBook: "",
    isRedirected: false,
    formData: "",
  });

  const {
    name,
    description,
    author,
    genres,
    createdBook,
    error,
    formData,
  } = values;

  const onSubmit = (event) => {
    event.preventDefault();
    setvalues({ ...values, error: "" });
    updateBook(match.params.bookId, user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setvalues({ ...values, error: data.error });
        } else {
          setvalues({
            name: "",
            description: "",
            author: "",
            error: "",
            isRedirected: true,
            photo: "",
            createdBook: data.name,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    return setvalues({ ...values, [name]: value });
  };

  const preload = (bookId) => {
    getBook(bookId)
      .then((data) => {
        if (data.error) {
          setvalues({ ...values, error: "Failed to load genres" });
        } else {
          preloadGenres();
          setvalues({
            ...values,
            name: data.name,
            description: data.description,
            author: data.author,
            genre: data.genre._id,
            formData: new FormData(),
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const preloadGenres = () => {
    getGenres()
      .then((data) => {
        console.log(data);
        if (data.error) {
          setvalues({ ...values, error: "Failed to load genres" });
        } else {
          setvalues({ formData: new FormData(), genres: data });
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    preload(match.params.bookId);
    // eslint-disable-next-line
  }, []);

  const goback = () => (
    <Link className="btn text-dark btn-warning mt-3" to="/books">
      Manage Books
    </Link>
  );

  const onError = () => (
    <div className="col-md-6 offset-sm-3 text-left">
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    </div>
  );

  const onSuccess = () => (
    <div className="col-md-6 offset-sm-3 text-left">
      <div
        className="alert alert-dark text-success container-fluid"
        style={{ display: createdBook ? "" : "none" }}
      >
        <div className="row">
          <div className="col-sm-12 text-left">
            {createdBook} Updated Successfully
          </div>
        </div>
      </div>
    </div>
  );

  const createBookForm = () => (
    <form>
      <span className="font-weight-bold">Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-dark">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="Choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("author")}
          className="form-control"
          placeholder="Author"
          value={author}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("genre")}
          className="form-control"
          placeholder="Genre"
        >
          <option>Select Genre</option>
          {genres &&
            genres.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>

      <button type="submit" onClick={onSubmit} className="btn btn-warning">
        Update Book
      </button>
    </form>
  );

  return (
    <Base title="Update Book" description="Edit the desired fields">
      <div className="container">{goback()}</div>
      <p className="p-2 ">
        {onSuccess()}
        {onError()}
      </p>
      <div className="container bg-info">
        <div className="row p-4">
          <div className="col-10 offset-1">{createBookForm()}</div>
        </div>
      </div>
    </Base>
  );
};

export default UpdateBook;
