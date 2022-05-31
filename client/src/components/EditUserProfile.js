import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwt from "../utils/jwt.js";
import PostedNavbar from "./PostedNavbar.js";
import './UserProfile.css';


function EditUserProfile() {
    const [userInfo, setUserInfo] = useState(0);
    useEffect(() => {
        jwt.getUser().then(user => {
            console.log(user);
            setUserInfo(user);
        })
        try {
            if (userInfo.team_set && userInfo.team_set.length === 0) {
                userInfo.team_set = 'None';
            } else {
                console.log(userInfo.team_set);
            }
        } catch (e) {
            console.log(e);
        }
    }, [userInfo.username, userInfo.email]);

    const navigate = useNavigate();

    const handleFormSubmit = (event) => {
        event.preventDefault()
        const name = event.target[0].value
        const email = event.target[1].value
        console.log(name + ", " + email)
        // TODO: add validation
        axios.patch('/api/users/', {
            id: userInfo.id,
            username: name,
            email: email
        }).then(navigate('/profile'))
    }

    return (
        <div className="profile-background">
            <PostedNavbar />
            <h2>{userInfo.username}'s Profile</h2>

            <Image src="/logo192.png"></Image>

            <br></br>
            <Form className="container-md" onSubmit={handleFormSubmit}>
                <Form.Group style={{ maxWidth: '35%', margin: '0 auto' }} className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Edit Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>

                <Form.Group style={{ maxWidth: '35%', margin: '0 auto' }} className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Edit Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );

}



export default EditUserProfile