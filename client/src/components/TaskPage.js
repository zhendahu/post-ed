import { React, Component, useRef, useState, useEffect } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import TaskGroup from "./TaskGroup";
import "./TaskGroup.js";
import './TaskPage.css';
import PostedNavbar from "./PostedNavbar";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from "axios";
import { useParams } from "react-router-dom"
import { lighten, TableRow } from "@mui/material";

function TaskPage(props) {
  const [isLoading, setLoading] = useState(true);
  let [taskGroupObjects, setTaskGroupObjects] = useState([]);
  let [teamName, setTeamName] = useState('');
  const { id } = useParams();

  const getData = async () => {
    const taskGroupArray = [];
    const teamGroupsData = (await axios(`/api/teams/${id}`)).data;
    setTeamName(teamGroupsData.team_name);
    let index = 0;
    for (const taskGroup of teamGroupsData.team_groups) {
      const taskArray = []
      const tasksGroupsData = (await axios(taskGroup)).data;
      for (const tasks of tasksGroupsData.group_tasks) {
        const task = (await axios(tasks)).data.task_name;
        taskArray.push({
          title: task
        });
      }
      taskGroupArray.push(<Col>{<TaskGroup key={index} title={tasksGroupsData.taskgroup_name} tasks={taskArray} />} <br></br></Col>)
      index++;
    }
    setTaskGroupObjects(taskGroupArray);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [taskGroupObjects.length]);

  return (
    <DndProvider backend={HTML5Backend}>

      <div className="task-background">
        <PostedNavbar />
        <h1 className="group-title">{teamName}</h1>
        {!isLoading && <Row xs={1} md={3} style={{ maxWidth: '100%', padding: '1em' }}>

          {taskGroupObjects}

        </Row>}

      </div>
    </DndProvider>
  );

}

export default TaskPage
