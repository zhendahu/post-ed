import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import { Card, Button } from 'react-bootstrap';
import EditTaskModal from "./EditTaskModal";
import './Task.css'
import { ItemTypes } from "./DragAndDrop";
import { useParams } from "react-router-dom";
import { useDrag } from "react-dnd";
import TrashBin from "../static/images/trashbin.png";
import axios from "axios";

//task component containing information acquired from endpoint
//includes checkbox functionality for user to mark completed tasks
//and uncheck box in event task was not sufficiently completed

//title task
//author
//checkbox
//clicking functionality

//STILL NEED TO ADD FUNCTIONALITY FOR OPENING A TASK THAT IS ALREADY
//MADE AND NEEDS TO BE EDITED

const Task = (props) => {


  const [show, setShow] = useState(false);

  // const style = {
  //   height: 25,
  //   width: 100,
  //   fontSize: 12,
  //   padding: 0,
  // }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),

  }))

  const [isChecked, setIsChecked] = useState(false);
  const style = {
    height: 20,
    width: 75,
    fontSize: 10,
    padding: 0

  };

  function onHide() {
    setShow(false)
  }

  function openEditTaskModal() {
    setShow(true)
  }

  const removeTask = () => {
    axios.delete(props.data.url)
    props.refresh()
  };

  const { id } = useParams();

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      <Card className="shadow p-3 mb-1 mt-1 bg-white rounded"
        style={{ border: "1px solid grey", borderRadius: "50px 50px" }} >
        <EditTaskModal id={id} show={show} onHide={() => onHide()} title={props.data.title} desc={props.data.desc} assignee={props.data.assignee}></EditTaskModal>
        <Card.Title style={{ "textAlign": "center", "fontSize": "20px" }}>{props.data.title}</Card.Title>
        <br></br>
        <div style={{ display: "flex", justifyContent: "space-between" }}>

          <Button
            variant="outline-primary"
            onClick={() => openEditTaskModal()}
            style={style}
            className='task-button'
          >
            Open Task </Button>

          <Button
            variant="outline-danger"
            size="sm"

            onClick={() => removeTask()}
          >
            <img src={TrashBin} alt="add item" width="10" />
          </Button>
        </div>
      </Card>

    </div>
  );
}

export default Task;
