import React, { useEffect,useState } from "react";
import {Form,Button, ListGroup} from "react-bootstrap";
import { useParams } from "react-router";
import App from "../App";
import './UserProfile.css';


function UserProfile (props) {
    const [userInfo, setUserInfo] = useState(0);
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/users/1/").then(response => response.json())
        .then(data => {
            setUserInfo(data)
            console.log(data)});
    })

    const {id} = useParams()

        return (
            <div className="profile-background">
                <div id="header1">
                    <h1>Post-Ed</h1>
                </div>
                <div id="header2">
                    <h2>{userInfo.username}'s Profile</h2>
                </div>

                <div id="listgroup">
                    <ListGroup.Item>Name: {userInfo.username} </ListGroup.Item>
                    <ListGroup.Item>Email: {userInfo.email} </ListGroup.Item>
                    <ListGroup.Item>Groups: {userInfo.groups} </ListGroup.Item>
                    <ListGroup.Item>Assigned tasks: {props.tasks} </ListGroup.Item>
                </div>

                <div id="profile-picture">
                    <img id="profpic" src={props.profilepicture} width = '300px' />
                </div>

                <div id="edit-profile-button">
                    <button>Edit profile</button>
                </div>
                <div id="create-group">
                    <button>Create new group</button>
                </div>
                <div id="join-group">
                    <button>Join group</button>
                </div>
            </div>
        );
    
}



export default UserProfile