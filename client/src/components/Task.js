import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import { Card, Button } from 'react-bootstrap';
import EditTaskModal from "./EditTaskModal";
import './Task.css'
import { ItemTypes } from "./DragAndDrop";
import { useDrag } from "react-dnd";

//task component containing information acquired from endpoint
//includes checkbox functionality for user to mark completed tasks
//and uncheck box in event task was not sufficiently completed

//title task
//author
//checkbox
//clicking functionality

//STILL NEED TO ADD FUNCTIONALITY FOR OPENING A TASK THAT IS ALREADY
//MADE AND NEEDS TO BE EDITED

const Task=(props)=>{

  const [{isDragging}, drag] = useDrag(() => ({
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
    return(
        <div 
          ref={drag}
          style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move',
          }}
        >
                <p className='task-title'>{props.data.title}</p>
                <Button
                variant="outline-primary"
                onClick={() => this.openEditTaskModal()}
                style = {style}
                className = 'task-button'
                >
                    Open Task </Button>
     </div>
        );
}

export default Task;
