import PostedNavbar from "./PostedNavbar";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const CreateGroup = () => {

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const name = event.target[0];
        const password = event.target[1];
        const confirm = event.target[2];
        if (password !== confirm) {
            console.log("passwords do not match");
            return;
        }
        fetch("http://localhost:8000/api/teams/", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
                "team_name": "${name}",
                "team_password": "${password}",
                "team_groups": []
            }` // body data type must match "Content-Type" header
        }).then(res => res.json()).then(data => console.log(data));
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