import React from "react";
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button } from "react-bootstrap";
import {TaskModal} from "./components/TaskModal.js"
import LoginModal from "./components/Login.js"
import UserProfile from "./components/UserProfile.js"
import ProfilePic from "./static/images/trashbin.png"


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
  render(){
  
  return (
    <div className="App">
     
        {/* <Button variant="primary" onClick={()=>this.setState({show:true})}>
        Launch demo modal
      </Button> */}
      
      

      <div><UserProfile /></div>
      
    </div>
  );
  }
}

UserProfile.defaultProps = {
  name: "Bob Ross",
  email: "bobross@gmail.com",
  groups: "Google",
  tasks: "Learn Emacs",
  profilepicture: ProfilePic

};

export default App;
