import React, { useEffect, useState } from "react";
import { Button, ListGroup, Image, Modal } from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import PostedNavbar from "./PostedNavbar.js";
import jwt from "../utils/jwt.js";
import axios from "axios";

function UserProfileModal(props) {
  const [userInfo, setUserInfo] = useState(0);
  useEffect(() => {
      jwt.getUser_fromName(props.name).then((user) => setUserInfo(user));
    });   

  function badUrl(url){
        
    if(url[23] ==url[24]){
        return true;
    }
    return false;
}

  const url = (badUrl(axios.defaults.baseURL + "/static/" + userInfo.image_url) ? axios.defaults.baseURL + "/static" + userInfo.image_url : axios.defaults.baseURL + "/static/" + userInfo.image_url)

  return (
    <Modal show={props.show} onHide={() => props.onHide()}>
    <Modal.Header closeButton> 
    <Modal.Title style={{textAlign:"center"}}>{userInfo.username}'s Profile</Modal.Title>
     </Modal.Header>
    <Modal.Body >
    <div style={{textAlign:"center", fontWeight:"bold"}}>
          {userInfo.image_url ? (
            <Image
              src={url}
              style={{
                width: "75",
                height: "75",
                objectFit: "cover",
                marginBottom: "0.75rem",
                borderRadius: "2rem",
                opacity: "0.9",
                borderWidth: "4px",
                borderStyle: "solid",
                borderColor: "rgba(255,255,255,.1)",
                boxShadow:
                  "0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
              }}
            ></Image>
          ) : null}
      <br></br>
      <br></br>
        <h4 >Name: {userInfo.last_name}</h4>
       <h4>Email: {userInfo.email}</h4>
      </div>
    </Modal.Body>
    </Modal>
  );
}

export default UserProfileModal;
