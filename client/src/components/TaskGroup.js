import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, ListGroup, ToggleButton, Form, Modal } from "react-bootstrap";
import TrashBin from "../static/images/trashbin.png";
import Task from "./Task.js";
//import TaskModal from "./TaskModal.js";


function TaskGroup(props) {

  const [show, setShow] = useState(false)
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)

  const addTask = () => {
    setShow(true)
  }
  //INCOMPLETE
  const removeTaskGroup = () => {
    
    axios.patch('/api/taskgroups/', {
      group_id: props.id,
      should_delete: true
    }).then(res => {
      
      window.location.reload();
    });
  }

  const onHide = () => {
    setShow(false)
  }

  const getData = async () => {
    const users = [];
    let index = 0;
    for (const url in props.users) {
      const reqData = (await axios.get(url)).data;
      users.push(<option key={index} value={reqData.username}>{reqData.username}</option>);
      index++;
    }
    setUserData(users);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  });

  const handleTaskSubmit = (event) => {
    event.preventDefault();
    const taskName = event.target[0].value;
    const taskDesc = event.target[1].value;
    const taskAssign = event.target[2].value;
    
    axios.post('/api/tasks/', {
      task_name: taskName,
      task_description: taskDesc,
      task_assignee: taskAssign,
      group: props.url
    })
    window.location.reload();
  }

  return (
    <Card style={{height:"80vh",overflow:"scroll"}} className="text-center">
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.subtitle}
        </Card.Subtitle>



        {!loading && <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create a New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleTaskSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Task Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" autoFocus required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter description" autoFocus />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Assignee</Form.Label>
                <Form.Select aria-label="Default select example">
                  {userData}
                </Form.Select>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>}



        <ListGroup className="list-group-flush" bg="dark">
          {props.tasks.map((task) => (
            <ListGroup.Item>
              <Task data={task}> </Task>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </ListGroup.Item>
          ))}
        </ListGroup>
        <br></br>
        <ToggleButton onClick={() => addTask()} variant="success">
          {" "}
          + New Task{" "}
        </ToggleButton>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeTaskGroup()}
          style={{ float: 'right' }}
        >
          <img src={TrashBin} alt="add item" width="10" />
        </Button>
      </Card.Body>
    </Card>
    // </DndProvider>
  );
}

export default TaskGroup