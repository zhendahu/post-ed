import React from "react";
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button } from "react-bootstrap";
import {TaskModal} from "./components/TaskModal.js"
import LoginModal from "./components/Login.js"
import Task from "./components/Task.js"
import TaskGroup from "./components/TaskGroup.js"

//functions for Task
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


class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      show:false
    }
  }

  handleClose(){
    this.setState({
      show:false
    })
  }

  openModal(){
    this.setState({
      show: true
    })
  }

  render(){
  
  return (
    <div className="App">
     
        {/* <Button variant="primary" onClick={()=>this.setState({show:true})}>
        Launch demo modal
      </Button> */}
      
      

      {/* <div id="login"><LoginModal/></div> */}
      <TaskModal show={this.state.show} onHide={this.handleClose()}></TaskModal>
      <div><TaskGroup title = "title" subtitle = "subtitle" tasks={fakeTaskData} onClick={this.openModal()}/></div>
    </div>

  );
  }
}

export default App;
