import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Task from "./Task.js";
import TaskModal from "./TaskModal.js";
import TaskGroup from "./TaskGroup.js";
import PostedNavbar from "./PostedNavbar.js";

//functions for Task
//STILL NEED TO CONNECT ENDPOINTS IN ORDER TO STORE THE REAL DATA
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

class TaskPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          show: false,
          setShow: false,
        };
    }

  render() {
      return(
        <div className="taskpage-background">
        <PostedNavbar />
        <TaskGroup title = "To Do" subtitle = "Thursday, May 26th" tasks = {fakeTaskData}></TaskGroup>
        </div>
      );
    }
}

export default TaskPage;