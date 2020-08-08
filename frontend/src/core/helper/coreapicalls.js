const { API } = require("../../backend");

//Book calls

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
  return fetch(`${API}genre/${genreId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

//add issue
export const postIssue = (userId, token, issue) => {
  return fetch(`${API}issue/create/${userId}`, {
    method: "POST",
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(issue),
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

//get issues of book
export const getAllIssues = (userId, bookId) => {
  return fetch(`${API}issue/issuehistory/${bookId}/${userId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};
