import { React, Component, useRef, useState, useEffect } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import TaskGroup from "./TaskGroup";
import "./TaskGroup.js";
import "./TaskPage.css";
import PostedNavbar from "./PostedNavbar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import { useParams } from "react-router-dom";
import { lighten, TableRow } from "@mui/material";
import TaskGroupModal from "./TaskGroupModal";

function TaskPage(props) {
  const [isLoading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  let [taskGroupObjects, setTaskGroupObjects] = useState([]);
  let [teamName, setTeamName] = useState("");
  const [teamUsers, setTeamUsers] = useState([]);
  const { id } = useParams();
  const [name, setName] = useState(null);
  const [run,setRun] = useState(0)

  const refresh=()=>{
    setRun(run+1)
  }
  const getData = async () => {
    const taskGroupArray = [];
    const teamGroupsData = (await axios(`/api/teams/${id}`)).data;

    let index = 999;
    for (const taskGroup of teamGroupsData.team_groups) {
      const tasksGroupsData = (await axios(taskGroup)).data;
      if (name && !tasksGroupsData.taskgroup_name.includes(name)) {
      } else {
        taskGroupArray.push(
          <Col key={tasksGroupsData.id}>
            {
              <TaskGroup
                users={teamGroupsData.team_users}
                key={index}
                title={tasksGroupsData.taskgroup_name}
                taskGroup={taskGroup}
                id={tasksGroupsData.id}
                url={tasksGroupsData.url}
                refresh={refresh.bind(this)}
              />
            }
            <br></br>
          </Col>
        );
        index++;
      }
    }
    setTaskGroupObjects(taskGroupArray);
    setLoading(false);
    setTeamUsers(teamGroupsData.team_users);
    setTeamName(teamGroupsData.team_name);
  };

  useEffect(() => {
    getData();
    setRun(false)
  }, [run, name]);
  const search = (e) => {
    setName(e.target[0].value);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{ height: "100vh", overflow: "scroll" }}
        className="task-background"
      >
        <PostedNavbar showSearch={true} handlSearch={search} />
        <h1 className="group-title">{teamName}</h1>
        <Button className="btn-sm" onClick={() => setShow(true)}>
          Create Task Group
        </Button>
        <TaskGroupModal
          id={id}
          show={show}
          onHide={() =>{setRun(run-1);setShow(false)}}
        ></TaskGroupModal>
        {!isLoading && (
          <Row xs={1} md={3} style={{ maxWidth: "100%", padding: "1em" }}>
           {!run?taskGroupObjects:null}
          </Row>
        )}
      </div>
    </DndProvider>
  );
}

export default TaskPage;
