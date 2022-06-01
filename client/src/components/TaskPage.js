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
import TaskGroupModal from "./TaskGroupModal";

function TaskPage(props) {
  const [isLoading, setLoading] = useState(true);
  const [show, setShow] = useState(false)
  let [taskGroupObjects, setTaskGroupObjects] = useState([]);
  let [teamName, setTeamName] = useState('');
  const [teamUsers, setTeamUsers] = useState([]);
  const { id } = useParams();

  const getData = async () => {
    const taskGroupArray = [];
    const teamGroupsData = (await axios(`/api/teams/${id}`)).data;
    setTeamUsers(teamGroupsData.team_users);
    setTeamName(teamGroupsData.team_name);
    let index = 999;
    for (const taskGroup of teamGroupsData.team_groups) {
      const taskArray = []
      const tasksGroupsData = (await axios(taskGroup)).data;
      for (const tasks of tasksGroupsData.group_tasks) {
        const task = (await axios(tasks)).data;
        taskArray.push({
          title: task.task_name,
          desc: task.task_description,
          assignee: task.task_assignee,
          url: task.url
        });
      }
      taskGroupArray.push(<Col>{<TaskGroup users={teamUsers} key={index} title={tasksGroupsData.taskgroup_name} tasks={taskArray} id={tasksGroupsData.id} url={tasksGroupsData.url} />} <br></br></Col>)
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
        <Button className="btn-sm" onClick={() => setShow(true)}>Create Task Group</Button>
        <TaskGroupModal id={id} show={show} onHide={() => setShow(false)}></TaskGroupModal>
        {!isLoading && <Row xs={1} md={3} style={{ maxWidth: '100%', padding: '1em' }}>
          {taskGroupObjects}
        </Row>}

      </div>
    </DndProvider>
  );

}

export default TaskPage
