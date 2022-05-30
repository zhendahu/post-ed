import React, { useEffect, useState } from "react";
import { Button, ListGroup, Image } from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import './UserProfile.css';
import PostedNavbar from "./PostedNavbar.js";
import jwt from "../utils/jwt.js";
import axios from "axios";

function UserProfile(props) {
    const [userInfo, setUserInfo] = useState(0);
    const [teamsInfo, setTeamsInfo] = useState([]);
    useEffect(() => {
        jwt.getUser().then(user => {
            console.log(user);
            setUserInfo(user);
        })
        try {
            if (userInfo.team_set && userInfo.team_set.length === 0) {
                userInfo.team_set = 'None';
            } else {
                for (let i = 0; i < userInfo.team_set.length; i++) {
                    axios.get(userInfo.team_set[i]).then(res => teamsInfo[i] = res.data.team_name);
                }
                setTeamsInfo(teamsInfo)
            }
        } catch (e) {
            console.log(e);
        }
    }, [userInfo.username, userInfo.email, teamsInfo.length]);

    const navigate = useNavigate();
    console.log(teamsInfo)
    
    return (
        <div className="profile-background">
            <PostedNavbar />
            <h2>{userInfo.username}'s Profile</h2>

            <Image src={userInfo.image_url}></Image>

            <div>
                <Button style={{ margin: "2px" }} onClick={() => navigate(`/profile/edit`)} >Edit profile</Button>
                <Button onClick={() => navigate(`/creategroup`)}>Create Group</Button>
                <Button onClick={() => navigate(`/joingroup`)} style={{ margin: "2px" }}>Join Group</Button>
            </div>
            <br></br>
            <ListGroup className="container" style={{maxWidth: '45%'}}>
                <ListGroup.Item>Name: {userInfo.username} </ListGroup.Item>
                <ListGroup.Item>Email: {userInfo.email} </ListGroup.Item>
                <ListGroup.Item>Groups: 
                    <ListGroup>
                        {teamsInfo.map((value, index) => {
                            return (
                                <ListGroup.Item key={index}>{value}</ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );

}



export default UserProfile