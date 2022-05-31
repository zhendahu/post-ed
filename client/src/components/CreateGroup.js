import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import jwt from "../utils/jwt.js";
import PostedNavbar from "./PostedNavbar";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
    const [userInfo, setUserInfo] = useState(0);
    const [errorInfo, setErrorInfo] = useState('');
    useEffect(() => {
        jwt.getUser().then(user => {
            console.log(user);
            setUserInfo(user);
        })
    }, [userInfo.url, errorInfo]);

    const navigate = useNavigate();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const name = event.target[0].value;
        const password = event.target[1].value;
        const confirm = event.target[2].value;
        console.log(password + ", " + confirm);
        if (password !== confirm) {
            console.log("passwords do not match");
            setErrorInfo('Passwords do not match');
            return;
        }
        axios.post('/api/teams/', {
            should_leave: false,
            team_name: name,
            team_password: password,
            team_groups: [],
            team_users: [userInfo.url]
        }).catch((error) => {
            console.log(error);
            return 0;
        }).then(code => {
            if (code !== 0) {
                navigate('/profile');
            } else {
                setErrorInfo('Group identifier already exists');
            }
        });
    };

    return (
        <>
            <PostedNavbar />
            <h2 style={{ marginBottom: "1em" }}>Create a new group</h2>
            <Form className="container-md" onSubmit={handleFormSubmit}>
                <Form.Group style={{ maxWidth: '35%', margin: '0 auto' }} className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Group Identifier</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" required />
                </Form.Group>

                <Form.Group style={{ maxWidth: '35%', margin: '0 auto' }} className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Group Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" />
                </Form.Group>

                <Form.Group style={{ maxWidth: '35%', margin: '0 auto' }} className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Re-enter password" required />
                </Form.Group>

                <p style={{color:'red'}}>{errorInfo}</p>
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default CreateGroup;