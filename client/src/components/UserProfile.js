import React, { useEffect, useState } from "react";
import { Button, ListGroup, Image } from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import './UserProfile.css';


function UserProfile(props) {
    const [userInfo, setUserInfo] = useState(0);
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/users/${id}/`).then(response => response.json())
            .then(data => {
                setUserInfo(data)
                console.log(data)
            });
    }, []);

    if (userInfo.groups && userInfo.groups.length === 0) {
        userInfo.groups = "None"
    } else {
        // TODO
    }

    const navigate = useNavigate();

    return (
        <div className="profile-background">
            <h1>Post-Ed</h1>
            <h2>{userInfo.username}'s Profile</h2>

            <Image src="/logo192.png"></Image>

            <div>
                <Button onClick={() => navigate(`/profile/edit/${id}`)} >Edit profile</Button>
                {/* <Button>Create new group</Button>
                <Button>Join group</Button> */}
            </div>
            <br></br>
            <div id="listgroup">
                <ListGroup.Item>Name: {userInfo.username} </ListGroup.Item>
                <ListGroup.Item>Email: {userInfo.email} </ListGroup.Item>
                <ListGroup.Item>Groups: {userInfo.groups} </ListGroup.Item>
            </div>
        </div>
    );

}



export default UserProfile