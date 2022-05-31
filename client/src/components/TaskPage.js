import { React, Component, useRef, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import TaskGroup from "./TaskGroup";
import "./TaskGroup.js";
import './TaskPage.css'
import PostedNavbar from "./PostedNavbar"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
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

function TaskPage() {

  
  return (
    <DndProvider backend={HTML5Backend}>
     
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
    </DndProvider>
  );

}

export default TaskPage
