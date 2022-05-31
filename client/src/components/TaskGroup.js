import React, { Component } from "react";
import { ListGroup, Button, Card, ToggleButton } from "react-bootstrap";
import Task from "./Task.js";
import TaskModal from "./TaskModal.js";

export default class TaskGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  addTask() {
    this.setState({
      show: true,
    });
  }
  //INCOMPLETE
  removeTask() {
    console.log("Goodbye World!");
  }
  
  onHide(){
    this.setState({
      show: false,
    });
  }

  render() {
    
    return (
      <Card className="text-center">
        <Card.Body>
          <Card.Title className='task-group-title'>{this.props.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {this.props.subtitle}
          </Card.Subtitle>
          <TaskModal show = {this.state.show} onHide = {() => this.onHide()}></TaskModal>
          <ListGroup className="list-group-flush" bg="dark">
            {this.props.tasks.map((task) => (
              <div>
              <ListGroup.Item style={{border: "1px solid white", borderRadius:"5%"}}>
                <Task data = {task}> </Task>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </ListGroup.Item>
              <br></br>
              </div>
            ))}
          </ListGroup>
          <br></br>
          <ToggleButton onClick={() => this.addTask()} variant="success">
            {" "}
            + New Task{" "}
          </ToggleButton>
        </Card.Body>
      </Card>
    );
  }
}
