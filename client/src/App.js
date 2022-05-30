import React,{useState} from "react";
//import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "react-bootstrap";
import { TaskModal } from "./components/TaskModal.js";
import LoginModal from "./components/Login.js";
import Task from "./components/Task.js";
import TaskGroup from "./components/TaskGroup.js";
import SignUpModal from "./components/SignUp.js";
import Home from "./components/Home.js";
import { Routes, Route, BrowserRouter ,useNavigate} from "react-router-dom";
import TaskPage from "./components/TaskPage.js";
import UserProfile from "./components/UserProfile";
import EditUserProfile from "./components/EditUserProfile";
import CreateGroup from "./components/CreateGroup";
import JoinGroup from "./components/JoinGroup";

// import logo from "./logo.svg";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import { Button } from "react-bootstrap";
// import { TaskModal } from "./components/TaskModal.js";
// import LoginModal from "./components/Login.js";

import axios from "axios";
import jwt from "./utils/jwt.js";

axios.defaults.baseURL = "//127.0.0.1:8000";
const SetupInterceptors = (navigate) => {
  axios.interceptors.request.use(
    function (config) {
      console.log("request")
      config.headers.Authorization = "Bearer "+jwt.getToken();
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      console.log("response");
      return response;
    },
    function (error) {
      console.log("error",error);
      if(error.response.status==401){
        navigate("/login",{replace:true})
      }
      return Promise.reject(error);
    }
  );
};

function NavigateFunctionComponent(props) {
  let navigate = useNavigate();
  const [ran,setRan] = useState(false);

  {/* only run setup once */}
  if(!ran){
     SetupInterceptors(navigate);
     setRan(true);
  }
  return <></>;
}

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
        {<NavigateFunctionComponent />}
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
                <div id="login" className="home-background">
                  <SignUpModal />
                </div>
              }
            />
            <Route
              exact
              path="/profile"
              element={
                <div id="profile" className="home-background">
                  <UserProfile />
                </div>
              }
            />
            <Route
              exact
              path="/profile/edit"
              element={
                <div id="edit_profile" className="home-background">
                  <EditUserProfile />
                </div>
              }
            />
            <Route
              exact
              path="/creategroup"
              element={
                <div>
                  <CreateGroup />
                </div>
              }
            />
            <Route
              exact
              path="/joingroup"
              element={
                <div>
                  <JoinGroup />
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
