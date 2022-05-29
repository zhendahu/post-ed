import React, { useEffect, useState } from "react";
import { Form, Button, ListGroup, Image } from "react-bootstrap";
import { useParams } from "react-router";
import App from "../App";
import './UserProfile.css';


function EditUserProfile(props) {
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

    return (
        <div className="profile-background">
            <h1>Post-Ed</h1>
            <h2>{userInfo.username}'s Profile</h2>

            <Image src="/logo192.png"></Image>

            <br></br>
            <Form class="container-md">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Edit Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Edit Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" method="POST">
                    Submit
                </Button>
            </Form>
        </div>
    );

}



export default EditUserProfile