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
            <h2>{userInfo.username}'s Profile</h2>

            <Image src={userInfo.image_url} style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '0.75em' }}></Image>

            <div>
                <Button style={{ margin: "2px" }} onClick={() => navigate(`/profile/edit`)} >Edit profile</Button>
                <Button onClick={() => navigate(`/creategroup`)}>Create Group</Button>
                <Button onClick={() => navigate(`/joingroup`)} style={{ margin: "2px" }}>Join Group</Button>
            </div>
            <br></br>
            <ListGroup className="container" style={{ maxWidth: '45%' }}>
                <ListGroup.Item><h4>Name: {userInfo.username}</h4> </ListGroup.Item>
                <ListGroup.Item><h4>Email: {userInfo.email}</h4> </ListGroup.Item>
                <ListGroup.Item><h3>Groups</h3>
                    <ListGroup>
                        {teamsInfo.map((value, index) => {
                            return (
                                <ListGroup.Item key={index}>{value}<Button onClick={() => handleLeaveGroup(value)} className="btn-sm btn-danger float-end" style={{}}>Leave</Button></ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );

}



export default UserProfile