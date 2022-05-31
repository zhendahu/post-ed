import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwt from "../utils/jwt.js";
import PostedNavbar from "./PostedNavbar.js";
import './UserProfile.css';


function EditUserProfile() {
    const [userInfo, setUserInfo] = useState(0);
    const [checkedAvatar, setCheckedAvatar] = useState(-1);
    const [errorInfo, setErrorInfo] = useState('');
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

    let avatars = []
    avatars.push("/avatars/doge.png")
    avatars.push("/avatars/peppa.png")
    avatars.push("/avatars/stitch.png")
    avatars.push("/avatars/yinyang.png")

    const handleFormSubmit = (event) => {
        event.preventDefault()
        console.log(event.target)
        let checked = -1;
        for (let i = 0; i < 4; i++) {
            if (event.target[i].checked === true) {
                checked = i;
                break;
            }
        }
        console.log(checked);
        const name = event.target[4].value
        const email = event.target[5].value

        let avatarSource = userInfo.image_url;
        if (checked >= 0) {
            avatarSource = avatars[checked];
        }
        console.log(name + ", " + email)
        // TODO: add validation
        axios.patch('/api/users/', {
            id: userInfo.id,
            username: name,
            email: email,
            avatar: avatarSource
        }).catch((error) => {
            console.log(error);
            return 0;
        }).then(code => {
            if (code !== 0) {
                navigate('/profile');
            } else {
                setErrorInfo('Username already taken');
            }
        });
    }

    return (
        <div className="profile-background">
            <PostedNavbar />
            <h2>Editing {userInfo.username}'s Profile</h2>

            <br></br>
            <Form className="container-md" onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Choose Profile Picture</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            label={<Image src={avatars[0]} />}
                            name="group1"
                            type='radio'
                        />
                        <Form.Check
                            inline
                            label={<Image src={avatars[1]} />}
                            name="group1"
                            type='radio'
                        />
                    </div>

                    <div>
                        <Form.Check
                            inline
                            label={<Image src={avatars[2]} />}
                            name="group1"
                            type='radio'
                        />
                        <Form.Check
                            inline
                            label={<Image src={avatars[3]} />}
                            name="group1"
                            type='radio'
                        />
                    </div>
                </Form.Group>

                <Form.Group style={{ maxWidth: '35%', margin: '0 auto' }} className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Edit Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" required />
                </Form.Group>

                <Form.Group style={{ maxWidth: '35%', margin: '0 auto' }} className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Edit Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <p style={{color:'red'}}>{errorInfo}</p>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );

}



export default EditUserProfile