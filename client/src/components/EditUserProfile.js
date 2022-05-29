import React, { useEffect,useState } from "react";
import {Form,Button, ListGroup} from "react-bootstrap";
import { useParams } from "react-router";
import App from "../App";
import './UserProfile.css';


function EditUserProfile (props) {
    const [edit_userInfo, edit_setUserInfo] = useState(0);
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/users/1/").then(response => response.json())
        .then(data => {
            edit_setUserInfo(data)
            console.log(data)});
    })

    const {id} = useParams()

        return (
            <div className="profile-background">
                <div id="header1">
                    <h1>Post-Ed</h1>
                </div>
                <div id="header2">
                    <h2>{edit_userInfo.username}'s Profile</h2>
                </div>

                <div id="listgroup">
                    <ListGroup.Item>Name: </ListGroup.Item>
                    <ListGroup.Item>Email: </ListGroup.Item>
                    <ListGroup.Item>Groups:  </ListGroup.Item>
                    <ListGroup.Item>Assigned tasks: {props.tasks} </ListGroup.Item>
                </div>

                <div id="profile-picture">
                    <img id="profpic" src={props.profilepicture} width = '300px' />
                </div>

                <div id="save-profile-button">
                    <button>Save profile</button>
                </div>
            </div>
        );
    
}



export default EditUserProfile