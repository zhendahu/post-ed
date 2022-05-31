import { React, Component, useRef, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import TaskGroup from "./TaskGroup";
import "./TaskGroup.js";
import './TaskPage.css';
import PostedNavbar from "./PostedNavbar";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from "axios";

function TaskPage(props) {
  const [taskGroupInfo, setTaskGroupInfo] = useState([]);
  let [taskInfo, setTaskInfo] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/teams/1/').then(res => {
      for (let i = 0; i < res.data.team_groups.length; i++) {
        axios.get(res.data.team_groups[i]).then(res => {
          taskGroupInfo[i] = res.data.taskgroup_name;
          taskInfo = new Array(res.data.group_tasks.length)
          taskInfo.fill([])
          for (let j = 0; j < res.data.group_tasks.length; j++) {
            axios.get(res.data.group_tasks[j]).then(res => {
              taskInfo[i][j] = {
                title: res.data.task_name
              };
            })
          }
        }).then(() => {
          setTaskGroupInfo(taskGroupInfo);
          setTaskInfo(taskInfo);
          setLoading(false);
        })
      }
    })
  }, [taskInfo.length, taskGroupInfo.length]);

  return (
    <DndProvider backend={HTML5Backend}>

      <div className="task-background">
        <PostedNavbar />
        <h1 className="group-title">{props.group}</h1>
        {!isLoading && <Row xs={1} md={3} className="task-collection">

          {taskGroupInfo.map((taskGroup, index) => {

            return (
              <Col>{<TaskGroup title={taskGroup} tasks={taskInfo[index]} />} <br></br></Col>
            )
          })}

        </Row>}

      </div>
    </DndProvider>
  );

}

export default TaskPage
