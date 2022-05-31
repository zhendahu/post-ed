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
    console.log('hi')
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
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Assignee</Form.Label>

            <Form.Select aria-label="Default select example">
            <option>Assign this task to...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            </Form.Select>
            </Form.Group>
            <Button variant="primary" type='submit'>
            Save Changes
          </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default EditTaskModal;
