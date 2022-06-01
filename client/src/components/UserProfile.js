import React, { useEffect, useState } from "react";
import { Button, ListGroup, Image } from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import PostedNavbar from "./PostedNavbar.js";
import jwt from "../utils/jwt.js";
import axios from "axios";

function UserProfile(props) {
  const [userInfo, setUserInfo] = useState(0);
  const [teamsInfo, setTeamsInfo] = useState([]);
  useEffect(() => {
    jwt.getUser().then((user) => {
      setUserInfo(user);
    });
    try {
      if (userInfo.team_set && userInfo.team_set.length === 0) {
        userInfo.team_set = "None";
      } else {
        for (let i = 0; i < userInfo.team_set.length; i++) {
          axios
            .get(userInfo.team_set[i])
            .then((res) => (teamsInfo[i] = res.data.team_name));
        }
        setTeamsInfo(teamsInfo);
      }
    } catch (e) {}
  }, [userInfo.username, userInfo.email, teamsInfo.length]);

  const navigate = useNavigate();

  const handleLeaveGroup = (groupName) => {
    axios
      .patch("/api/teams/", {
        should_leave: true,
        id: userInfo.id,
        name: groupName,
        password: "no need",
      })
      .then(window.location.reload(false));
  };

  return (
    <div className="profile-background">
      <PostedNavbar />
      <div id="name-and-pic">
        <h2>{userInfo.username}'s Profile</h2>
        <div>
          <Image
            src={axios.defaults.baseURL + "/static/" + userInfo.image_url}
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              marginBottom: "0.75rem",
              borderRadius: "2rem",
              opacity: "0.9",
              borderWidth: "4px",
              borderStyle: "solid",
              borderColor:"rgba(255,255,255,.1)",
              boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)"
            }}
          ></Image>
        </div>
        <div>
          <Button
            style={{ margin: "2px" }}
            onClick={() => navigate(`/profile/edit`)}
          >
            Edit profile
          </Button>
        </div>
      </div>
      <br></br>
      <div>
        <h2 className="name">Name: {userInfo.last_name}</h2>
        <br></br>
        <h2>Email: {userInfo.email}</h2>
        <br></br>
        <br></br>
        <br></br>
        <h2 className="group-title">Groups:</h2>
        <br></br>
        <ListGroup className="groups" style={{ maxWidth: "25%" }}>
          {teamsInfo.map((value, index) => {
            return (
              <ListGroup.Item
                variant="info"
                key={index}
                style={{ fontFamily: "Concert One", fontSize: "2rem" }}
              >
                {value}
                <Button
                  onClick={() => handleLeaveGroup(value)}
                  className="btn-sm btn-danger float-end"
                  style={{ display: "flex", "align-items": "center" }}
                >
                  Leave
                </Button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </div>
  );
}

export default UserProfile;
