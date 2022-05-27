import React from 'react';
import {Modal,Form,Button} from "react-bootstrap";

class EditProfileModal extends React.Component {
    constructor(props){
        this.state = {
            show: false,
            setShow: false,
        };
    }

    handleClose(){
        this.setState({show:false})
    }
    
    handleShow(){
        this.setState({show:true})
    }

    render(){
        return(
            <Modal show={this.props.show} onHide={()=>this.props.onHide()}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="editName" controlId="inputEditedName">
                            <Form.Label>Edit Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="editEmail" controlId="inputEditedEmail">
                            <Form.Label>Edit Email</Form.Label>
                            <Form.control
                                type="text"
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

            </Modal>
        );
    }
}

export default EditProfileModal