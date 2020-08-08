const { API } = require("../../backend");

//Genre Calls

//add genre
export const postGenre = (userId, token, genre) => {
  return fetch(`${API}genre/create/${userId}`, {
    method: "POST",
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(genre),
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

//get all genres
export const getGenres = () => {
  return fetch(`${API}genre`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

//Get genre by id
export const getGenre = (genreId) => {
  console.log(`${API}genre/${genreId}`);
  return fetch(`${API}genre/${genreId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

//update genre
export const updateGenre = (genreId, userId, token, genre) => {
  return fetch(`${API}genre/update/${genreId}/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(genre),
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

//delete genre
export const deleteGenre = (genreId, userId, token) => {
  return fetch(`${API}genre/delete/${genreId}/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

//Book Calls

//Create Book
export const postBook = (userId, token, book) => {
  console.log(`${API}book/create/${userId}`);
  return fetch(`${API}book/create/${userId}`, {
    method: "POST",
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
    body: book,
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

//Get All Books
export const getAllBooks = () => {
  return fetch(`${API}book`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

//Get a Book
export const getBook = (bookId) => {
  return fetch(`${API}book/${bookId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

//Update a Book
export const updateBook = (bookId, userId, token, book) => {
  return fetch(`${API}book/update/${bookId}/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
    body: book,
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

//Delete a Book
export const deleteBook = (bookId, userId, token) => {
  return fetch(`${API}book/delete/${bookId}/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};
