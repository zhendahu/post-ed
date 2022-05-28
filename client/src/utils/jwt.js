

let jwt = ""

function getToken(){
    if(jwt){
        return jwt;
    }
    return localStorage.getItem("token")
}

function setToken(token){
    jwt = token
    localStorage.setItem("token",token)
}

export default {getToken,setToken}