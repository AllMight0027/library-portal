import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import { getGenres, postBook } from "./helper/userapicalls";

export default function AddBook() {
  let bookId = "";

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
    postBook(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setvalues({ ...values, error: data.error });
        } else {
          console.log(data._id);
          bookId = data._id;
          console.log(bookId);
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

  const preload = () => {
    getGenres()
      .then((data) => {
        console.log(data);
        if (data.error) {
          setvalues({ ...values, error: "Failed to load genres" });
        } else {
          setvalues({ ...values, formData: new FormData(), genres: data });
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    preload();
    // eslint-disable-next-line
  }, []);

  const goback = () => (
    <Link className="btn text-dark btn-warning mt-3" to="/dashboard">
      Back
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
          <div className="col-sm-9 text-left">
            {createdBook} Added Successfully
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
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="description"
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
        Create Book
      </button>
    </form>
  );

  return (
    <Base title="Add Book" description="Enter the book details below">
      <div className="container">
        {goback()}
        <p className="p-2">
          {onSuccess()}
          {onError()}
        </p>
        <div className="container-fluid bg-info">
          <div className="row p-4">
            <div className="col-10 offset-1">{createBookForm()}</div>
          </div>
        </div>
      </div>
    </Base>
  );
}
