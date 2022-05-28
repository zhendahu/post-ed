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

  render() {
    return (
      <Modal show={this.props.show} onHide={() => this.props.onHide()}>
        <Modal.Header closeButton>
          <Modal.Title>Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>description</Form.Label>
              <Form.Control type="text" placeholder="description" autoFocus />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>assignments</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.onHide()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => this.props.onHide()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditTaskModal;
