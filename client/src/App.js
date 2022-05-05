import React from "react";
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button } from "react-bootstrap";
import {TaskModal} from "./components/TaskModal.js"


class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      show:true
    }
  }

  handleClose(){
    this.setState({
      show:false
    })
  }
  render(){
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button variant="primary" onClick={()=>this.setState({show:true})}>
        Launch demo modal
      </Button>
      <TaskModal show={this.state.show} onHide={()=>this.handleClose()}></TaskModal>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  }
}

export default App;
