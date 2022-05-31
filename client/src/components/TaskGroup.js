import React, { useState, useEffect, useRef } from "react";
import { ListGroup, Button, Card, ToggleButton } from "react-bootstrap";
import TrashBin from "../static/images/trashbin.png";
import Task from "./Task.js";
import TaskModal from "./TaskModal.js";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import jwt from "../utils/jwt";


function TaskGroup (props) {

  const [show, setShow] = useState(false)

  const addTask = () => {
    setShow(true)
  }
  //INCOMPLETE
  const removeTask = () => {
    console.log("Goodbye World!");
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
            <TaskModal show = {show} onHide = {() => onHide()}></TaskModal>
            <ListGroup className="list-group-flush" bg="dark">
              {props.tasks.map((task) => (
                <ListGroup.Item>
                  <Task data = {task}> </Task>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeTask()}
                  >
                    <img src={TrashBin} alt="add item" width="10" />
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <br></br>
            <ToggleButton onClick={() => addTask()} variant="success">
              {" "}
              + New Task{" "}
            </ToggleButton>
          </Card.Body>
        </Card>
      // </DndProvider>
    );
}

export default TaskGroup