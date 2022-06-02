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

function getUser(){
    return new Promise((resolve, reject) => {
        axios
          .get("/user/currentUser")
          .then((res) => {              
              axios.get(`/api/users/${res.data.userId}/`).then((res1)=>{
                  resolve(res1.data)
              }).catch(err=>{
                  reject(err)
              })
          })
          .catch((err) => {
              reject(err)
          });
      });
}

function getUser_fromName(name){
  return new Promise((resolve, reject) =>{
    axios.get('/api/users').then(res =>{
      for(let i = 0; i<res.data.results.length; ++i){
        if(res.data.results[i].username==name){
          resolve(res.data.results[i])
        }
      }
    })
  })
}

function clearToken(){
  
  jwt = "";
  localStorage.clear("token")
}

export default {clearToken,login, getToken, setToken ,getUser, getUser_fromName};
