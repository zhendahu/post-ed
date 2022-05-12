import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import {Card} from 'react-bootstrap';

//task component containing information acquired from CreateTask
//includes checkbox functionality for user to mark completed tasks
//and uncheck box in event task was not sufficiently completed

//title task
//author
//checkbox
//clicking functionality

const Task=()=>{
    const [isChecked, setIsChecked] = useState(false);
    return(
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Task Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Author</Card.Subtitle>
                <Card.Text>
                </Card.Text>
                <Checkbox onChange={(event)=>setIsChecked(!isChecked)}/>
                <Card.Link href="#">Open Task</Card.Link>
            </Card.Body>
        </Card>
        // <div>
        //     <h3>Title</h3>
        //     <h3>Author</h3>
        //     

        // </div>
        );
}

export default Task;