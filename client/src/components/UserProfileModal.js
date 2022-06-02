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
    jwt.getUser().then((user) => {
      setUserInfo(user);
    });}
  , [userInfo.username, userInfo.email, userInfo.last_name]);

  return (
    <Modal show={props.show} onHide={() => props.onHide()}>
    <Modal.Header closeButton> 
    <Modal.Title style={{textAlign:"center"}}>{userInfo.username}'s Profile</Modal.Title>
     </Modal.Header>
    <Modal.Body >
    <div style={{textAlign:"center", fontWeight:"bold"}}>
          {userInfo.image_url ? (
            <Image
              src={axios.defaults.baseURL + "/static/" + userInfo.image_url}
              style={{
                width: "100",
                height: "100",
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
        <p >Name: {userInfo.last_name}</p>
       <p>Email: {userInfo.email}</p>
      </div>
    </Modal.Body>
    </Modal>
  );
}

export default UserProfileModal;
