import React from "react";
import {Form,Button, ListGroup} from "react-bootstrap";
import { useParams } from "react-router";
import App from "../App";
import './UserProfile.css';


function UserProfile (props) {

    const {id} = useParams()
    console.log("Hello")

        return (
            <div className="profile-background">
                <div id="listgroup">
                    <ListGroup.Item>Name: {id} </ListGroup.Item>
                    <ListGroup.Item>Email: {props.email} </ListGroup.Item>
                    <ListGroup.Item>Groups: {props.groups} </ListGroup.Item>
                    <ListGroup.Item>Assigned tasks: {props.tasks} </ListGroup.Item>
                </div>

                <div id="profile-picture">
                    <img id="profpic" src={props.profilepicture} width = '300px' />
                </div>
            </div>
        );
    
}



export default UserProfile