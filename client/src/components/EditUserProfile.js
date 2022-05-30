import React, { useEffect, useState } from "react";
import { Form, Button, ListGroup, Image } from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import App from "../App";
import './UserProfile.css';
import jwt from "../utils/jwt.js"
import PostedNavbar from "./PostedNavbar.js";


function EditUserProfile(props) {
    const [userInfo, setUserInfo] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();
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

    const handleFormSubmit = (event) => {
        event.preventDefault()
        const name = event.target[0].value
        const email = event.target[1].value
        console.log(name + ", " + email)
        fetch("http://localhost:8000/api/users/", {
            method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: `{
                "id": "${id}",
                "username": "${name}",
                "email": "${email}"
            }` // body data type must match "Content-Type" header
        }).then(res => res.json()).then(data => console.log(data))
            .then(navigate(`/profile/${id}`))
            .then(window.location.reload(false))
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