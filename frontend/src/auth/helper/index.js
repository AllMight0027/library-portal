const { API } = require("../../backend");

export const signup = (user) => {
  return fetch(`${API}auth/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

export const signin = (user) => {
  return fetch(`${API}auth/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

export const authenticate = (data, next) => {
  if (window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (window !== undefined) {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}auth/signout`, {
      method: "GET",
    })
      .then((res) => console.log("Signed Out"))
      .catch((e) => console.log(e));
  }
};

export const isAuthenticated = () => {
  if (window === undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
