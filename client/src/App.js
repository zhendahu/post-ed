import React from "react";
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button } from "react-bootstrap";
import {TaskModal} from "./components/TaskModal.js"
import LoginModal from "./components/Login.js"
import Task from "./components/Task.js"
import TaskGroup from "./components/TaskGroup.js"
import SignUpModal from "./components/SignUp.js"
import Home from "./components/Home.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import TaskPage from "./components/TaskPage.js"
import UserProfile from "./components/UserProfile";
import EditUserProfile from "./components/EditUserProfile"



// import logo from "./logo.svg";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import { Button } from "react-bootstrap";
// import { TaskModal } from "./components/TaskModal.js";
// import LoginModal from "./components/Login.js";


class App extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({
      show: false,
    });
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<TaskPage />} />
            <Route
              exact
              path="/login"
              element={
                <div className="home-background" id="login">
                  <LoginModal />
                </div>
              }
            />
            <Route
              exact
              path="/register"
              element={
                <div  id="login" className="home-background"> 
                  <SignUpModal />
                </div>
              }
            />
            <Route
              exact
              path="/profile/:id"
              element={
                <div  id="profile" className="home-background"> 
                  <UserProfile />
                </div>
              }
            />
            <Route
              exact
              path="/profile/edit/:id"
              element={
                <div  id="edit_profile" className="home-background"> 
                  <EditUserProfile />
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
      //     <div className="App">
      //   <div id="login"><Home/></div>
      //   <TaskModal show={this.state.show} onHide={()=>this.handleClose()}></TaskModal>
      // </div>
    );
  }
}

export default App;
