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

    const handleLeaveGroup = (groupName) => {
        console.log(groupName)
        axios.patch('/api/teams/', {
            should_leave: true,
            id: userInfo.id,
            name: groupName,
            password: 'no need'
        }).then(window.location.reload(false));
    }

    return (
        <div className="profile-background">
            <PostedNavbar />
            <div id="name-and-pic">
            <h2>{userInfo.username}'s Profile</h2>
            <div style={{borderRadius: '25px'}}>
            <Image src={userInfo.image_url} style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '0.75em' }}></Image>
            </div>
            <div>
                <Button style={{ margin: "2px" }} onClick={() => navigate(`/profile/edit`)} >Edit profile</Button>
                
            </div>
            </div>
            <br></br>
            <ListGroup className="groups" style={{ maxWidth: '45%' }}>
                <ListGroup.Item><h4>Name: {userInfo.username}</h4> </ListGroup.Item>
                <ListGroup.Item><h4>Email: {userInfo.email}</h4> </ListGroup.Item>
                <ListGroup.Item><h4>Groups 
                    <Button onClick={() => navigate(`/creategroup`)} style={{ margin: "10px"}}>Create Group    
                </Button>
                <Button onClick={() => navigate(`/joingroup`)} style={{ margin: "4px" }}>Join Group</Button> </h4>
                    <ListGroup>
                        {teamsInfo.map((value, index) => {
                            return (
                                <ListGroup.Item key={index} style="fontSize:2em;" style={{fontFamily: "Concert One"}}>{value}<Button onClick={() => handleLeaveGroup(value)} className="btn-sm btn-danger float-end" style={{}}>Leave</Button></ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );

}



export default UserProfile