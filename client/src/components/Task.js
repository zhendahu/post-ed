import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import { Card, Button } from 'react-bootstrap';
import EditTaskModal from "./EditTaskModal";

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
    const [isChecked, setIsChecked] = useState(false);
    return(
        <Card style={{ width: '25rem' }}>
            <Card.Body>
                <Card.Title>{props.data.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.data.author}</Card.Subtitle>
                <Card.Text>{props.data.description}</Card.Text>
                <Checkbox onChange={(event)=>setIsChecked(!isChecked)}/>
                <Button
                variant="outline-primary"
                onClick={() => this.openEditTaskModal()}
                >
                    Open Task </Button>
            </Card.Body>
        </Card>
        );
}

export default Task;
