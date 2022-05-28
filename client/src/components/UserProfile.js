import React from "react";
import {Form,Button, ListGroup} from "react-bootstrap";
import App from "../App";
import './UserProfile.css';


class UserProfile extends React.Component {
    render(){
        return (
            <div className="profile-background">
                <div id="listgroup">
                    <ListGroup.Item>Name: {this.props.name} </ListGroup.Item>
                    <ListGroup.Item>Email: {this.props.email} </ListGroup.Item>
                    <ListGroup.Item>Groups: {this.props.groups} </ListGroup.Item>
                    <ListGroup.Item>Assigned tasks: {this.props.tasks} </ListGroup.Item>
                </div>

                <div id="profile-picture">
                    <img id="profpic" src={this.props.profilepicture} width = '300px' />
                </div>
            </div>
        );
    }
}



export default UserProfile