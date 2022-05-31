import { React, Component } from "react";
import { Row, Col } from "react-bootstrap";
import TaskGroup from "./TaskGroup";
import "./TaskGroup.js";
import './TaskPage.css'
import PostedNavbar from "./PostedNavbar"
const fakeTaskData = [{
  title: "Finish 35L Project",
  author: "Melissa Chen",
  description: "klsdfjlskfjlksjflsdg.lk flskfjdlkfgjldkfg"
},
{
  title: "Finish 35L Project",
  author: "Melissa Chen",
  description: "klsdfjlskfjlksjflsdg.lk flskfjdlkfgjldkfg"
},
{
  title: "Finish 35L Project",
  author: "Melissa Chen",
  description: "klsdfjlskfjlksjflsdg.lk flskfjdlkfgjldkfg"
}]
let TaskGroups = [];
for (let i = 0; i < 5; ++i) {
  TaskGroups.push(
    <TaskGroup title={`Task Group ${i}`} tasks= {fakeTaskData}/>
  );
}

export default class TaskPage extends Component {
  render() {
  
    return (
      <div className="task-background">
        <PostedNavbar />
        <h1 className="task-title">Tasks:</h1>
        <Row xs={1} md={3} className="task-collection">
    
          {TaskGroups.map((TaskGroup) => {
           
            return(
            <Col>{TaskGroup} <br></br></Col>
            )
          })}
        </Row>
      </div>
    );
  }
}
