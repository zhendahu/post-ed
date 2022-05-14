import React, { Component } from 'react';
import {ListGroup, Button, Card, ToggleButton} from 'react-bootstrap'
import TrashBin from '../static/images/trashbin.png'
import Task from  "./Task"


export default class TaskGroup extends Component{


    addItem(){
        console.log("Hello World!")
    }

    removeItem(){
        console.log("Goodbye World!")
    }

    render(){

        return(
            <Card className="text-center">
            <Card.Body>
                <Card.Title>{this.props.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{this.props.subtitle}</Card.Subtitle>
            <ListGroup className="list-group-flush" bg='dark'>
            {this.props.tasks.map(task => 

<Task data={task} onClick={this.props.onClick}/>
           
    //        <ListGroup.Item>
    //        <big>{task}</big>
    //        &nbsp;&nbsp;&nbsp;&nbsp;
    //        <Button variant='outline-danger' size="sm" onClick={() => this.removeItem()} >   
    //        <img src={TrashBin} alt="add item" width="10" /> 
    //        </Button>
    //    </ListGroup.Item>
   
            )
            }
            </ListGroup>
            <br></br>
            <ToggleButton onClick={() => this.addItem()} variant='success' > + New Task </ToggleButton>
            </Card.Body>
            </Card>
     
        )

    }


}