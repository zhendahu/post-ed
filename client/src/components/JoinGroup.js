import PostedNavbar from "./PostedNavbar";
import { Form, Button } from "react-bootstrap";

const JoinGroup = () => {

    const handleFormSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <PostedNavbar />
            <h2 style={{ marginBottom: "1em" }}>Join an existing group</h2>
            <Form className="container-md" onSubmit={handleFormSubmit}>
                <Form.Group style={{ maxWidth: '35%', margin: '0 auto' }} className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>

                <Form.Group style={{ maxWidth: '35%', margin: '0 auto' }} className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Group Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default JoinGroup;