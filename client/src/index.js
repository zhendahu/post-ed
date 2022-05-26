import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

axios.defaults.baseURL = '//127.0.0.1:8000';

axios.interceptors.request.use(function (config) {

  return config;
}, function (error) {

  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {

  return response;
}, function (error) {

  return Promise.reject(error);
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
