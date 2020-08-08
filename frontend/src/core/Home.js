import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getAllBooks, getGenres } from "./helper/coreapicalls";
// import { withRouter } from 'react-router-dom'

const Home = ({ history }) => {
  const [books, setbooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [values, setvalues] = useState({ genre: "" });
  const { genre } = values;

  const loadAllBooks = () => {
    getAllBooks().then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setbooks(data);
      }
    });
  };

  const loadAllGenres = () => {
    getGenres().then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setGenres(data);
      }
    });
  };

  useEffect(() => {
    loadAllBooks();
    loadAllGenres();
  }, []);

  const clicked = (bookId) => (event) => {
    history.push(`/book/${bookId}`);
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setvalues({ ...values, [name]: value });
    console.log(value);
  };

  return (
    <Base title="Library Portal" description="">
      <div className="text-right row">
        <div className="col-xl-3 col-md-6 col-sm-12">
          <select
            onChange={handleChange("genre")}
            className="form-control"
            placeholder="Category"
          >
            <option>All Genres</option>
            {genres &&
              genres.map((cate, index) => (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="row text-center">
        {books &&
          books.map((book, index) => {
            console.log(genre);
            if (genre === "" || genre === "All Genres") {
              return (
                <div className="col-xl-3 col-sm-12 col-md-6 mt-2">
                  <Card title="Here" book={book} clicked={clicked(book._id)} />
                </div>
              );
            } else {
              if (genre === book.genre) {
                return (
                  <div className="col-xl-3 col-sm-12 col-md-6 mt-2">
                    <Card
                      title="Here"
                      book={book}
                      clicked={clicked(book._id)}
                    />
                  </div>
                );
              }
            }
            return "";
          })}
      </div>
    </Base>
  );
};

export default Home;
