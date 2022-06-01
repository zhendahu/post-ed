import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import jwt from "../utils/jwt.js";
import PostedNavbar from "./PostedNavbar";
import { useNavigate, Link } from "react-router-dom";
import './JoinGroup.css'

const JoinGroup = () => {
    const [userInfo, setUserInfo] = useState(0);
    const [errorInfo, setErrorInfo] = useState('');
    useEffect(() => {
        jwt.getUser().then(user => {
            
            setUserInfo(user);
        })
    }, [userInfo.url]);

    const navigate = useNavigate();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const name = event.target[0].value;
        const password = event.target[1].value;
        axios.patch('/api/teams/', {
            should_leave: false,
            id: userInfo.id,
            name: name,
            password: password
        }).catch((error) => {
            
            return 0;
        }).then(code => {
            if (code !== 0) {
                navigate('/profile');
            } else {
                setErrorInfo('Invalid group identifier or password');
            }
        });
    };

    return (
        <div>
            <PostedNavbar />
            <h2 style={{ marginBottom: "1em" }}>Join an existing group</h2>
            <Form className="container-md" onSubmit={handleFormSubmit}>
                <Form.Group style={{ maxWidth: '35%', margin: '0 auto' }} className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Group Identifier</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" required />
                </Form.Group>

                <Form.Group style={{ maxWidth: '35%', margin: '0 auto' }} className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Group Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" required />
                </Form.Group>
                <p style={{color:'red'}}>{errorInfo}</p>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <br></br>
            <br></br>

            <div>
                <p className='sub-title'>No groups to join?</p>
                <Link to="/creategroup"> Create a group instead</Link>
            </div>
        </div>
    );
}

export default JoinGroup;