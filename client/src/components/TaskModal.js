import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

class TaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      setShow: false,
      userData: [],
    };
    const getData = async () => {
      let users = [];
      let index = 0;
      for(const url of props.users) {
        const userData = (await axios.get(url)).data;
        users.push(<option key={index} value={index}>{userData.username}</option>);
        index++;
      }
      this.setState({
        userData: users
      });
    }
    getData();
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
    console.log('hi')

    event.preventDefault();
    const title = event.target[0].value;
    const description = event.target[1].value;
    const assignment = event.target[2].value;
    console.log(title + ", " + description + ', ' + assignment);
    this.setState({
      show: false
    })
  }


  render() {
    return (
      <Modal show={this.props.show} onHide={() => this.props.onHide()}>
        <Modal.Header closeButton>

          <Modal.Title>Create a New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter description" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Assignee</Form.Label>
              <Form.Select aria-label="Default select example">
                {this.state.userData}
              </Form.Select>
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

export default TaskModal;
