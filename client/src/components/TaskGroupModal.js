import axios from "axios";
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

class TaskGroupModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            setShow: false,
        };
    }

    handleClose() {

        this.setState({
            show: false,
        });
    }
    handleShow() {
        this.setState({
            show: true,
        });
    }
    handleFormSubmit(event) {
        

        event.preventDefault();
        const title = event.target[0].value;
        const description = event.target[1].value;
        const assignment = event.target[2].value;
        
        this.setState({
            show: false
        })
    }

    render() {
        const handleSubmit = (event) => {
            event.preventDefault();
            const groupName = event.target[0].value;
            axios.patch('/api/taskgroups/', {
                id: this.props.id,
                taskgroup_name: groupName,
                should_delete: false
            }).then(res => {
                
                window.location.reload();
            });
        };
        return (
            <Modal show={this.props.show} onHide={() => this.props.onHide()}>
                <Modal.Header closeButton>

                    <Modal.Title>Create a New Task Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Task Group Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" autoFocus />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                </Modal.Body>
            </Modal>
        );
    }
}

export default TaskGroupModal;
