import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

//THIS IS NOT COMPLETED
//DIFFERENCE BETWEEN EDITTASKMODAL AND TASKMODAL IS THAT TASKMODAL
//OPENS A NEW EMPTY FIELD FOR A NEW TASK WHEREAS EDITTASKMODAL WILL 
//DISPLAY THE MODAL WITH FILLED FIELDS THAT CAN BE EDITED

class EditTaskModal extends React.Component {
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

  handleSubmit(){
    
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={() => this.props.onHide()}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <p>{this.props.desc}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Assignee</Form.Label>
            <p>{this.props.assignee}</p>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default EditTaskModal;
