import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import jwt from "../utils/jwt.js";
import PostedNavbar from "./PostedNavbar";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
    const [userInfo, setUserInfo] = useState(0);
    useEffect(() => {
        jwt.getUser().then(user => {
            console.log(user);
            setUserInfo(user);
        })
    }, [userInfo.url]);

    const navigate = useNavigate();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const name = event.target[0].value;
        const password = event.target[1].value;
        const confirm = event.target[2].value;
        console.log(password + ", " + confirm);
        if (password !== confirm) {
            console.log("passwords do not match");
            return;
        }
        axios.post('/api/teams/', {
            team_name: name,
            team_password: password,
            team_groups: [],
            team_users: [userInfo.url]
        }).then(navigate('/profile'));
    };

    return (
        <>
            <PostedNavbar />
            <h2 style={{ marginBottom: "1em" }}>Create a new group</h2>
            <Form className="container-md" onSubmit={handleFormSubmit}>
                <Form.Group style={{ maxWidth: '35%', margin: '0 auto' }} className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>

                <Form.Group style={{ maxWidth: '35%', margin: '0 auto' }} className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Group Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" />
                </Form.Group>

                <Form.Group style={{ maxWidth: '35%', margin: '0 auto' }} className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Re-enter password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default CreateGroup;