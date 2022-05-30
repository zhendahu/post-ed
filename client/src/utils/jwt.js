import axios from "axios";

let jwt = "";

function getToken() {
  if (jwt) {
    return jwt;
  }
  return localStorage.getItem("token");
}

function setToken(token) {
  jwt = token;
  localStorage.setItem("token", token);
}

function login(username, password) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api-auth/token/", {
        username: username,
        password: password,
      })
      .then((res) => {
        setToken(res.data.access);
          resolve(res)
      })
      .catch((err) => {
          reject(err)
      });
  });
}

export default {login, getToken, setToken };
