import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, ListGroup, ToggleButton } from "react-bootstrap";
import TrashBin from "../static/images/trashbin.png";
import Task from "./Task.js";
import TaskModal from "./TaskModal.js";


function TaskGroup(props) {

  const [show, setShow] = useState(false)

  const addTask = () => {
    setShow(true)
  }
  //INCOMPLETE
  const removeTaskGroup = () => {
    console.log("Goodbye World!");
    axios.patch('/api/taskgroups/', {
      group_id: props.id,
      should_delete: true
  }).then(res => {
      console.log(res);
      window.location.reload();
  });
  }

  const onHide = () => {
    setShow(false)
  }

  const taskRef = useRef();
  const [x, setX] = useState();
  const [y, setY] = useState();

  const getPosition = () => {
    const x = taskRef.current.offsetLeft;
    setX(x);

    const y = taskRef.current.offsetTop;
    setY(y);
  };

  useEffect(() => {
    getPosition();
  }, [x, y]);

  console.log("x: ")
  console.log(x)
  console.log("y: ")
  console.log(y)

  return (

    // <DndProvider backend={HTML5Backend}>
    <Card className="text-center" ref={taskRef}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.subtitle}
        </Card.Subtitle>
        <TaskModal users={props.users} id={props.id} show={show} onHide={() => onHide()}></TaskModal>
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
          style={{float: 'right'}}
        >
          <img src={TrashBin} alt="add item" width="10" />
        </Button>
      </Card.Body>
    </Card>
    // </DndProvider>
  );
}

export default TaskGroup