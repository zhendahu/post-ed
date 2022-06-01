import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import "./Home.css";
import jwt from "../utils/jwt.js"

import { Navigate } from "react-router-dom";

import { Link } from "react-router-dom";

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.state = {
      username: "",
      password: "",
      goto: "",
      validated: false,
      usernamePrompt: "username can not be empty",
      passwordPrompt: "password can not be empty",
    };
  }
  componentDidMount() {
    jwt.clearToken()
  }
  render() {
    const onchange = (event) => {
      this.usernameRef.current.setCustomValidity("")
      this.passwordRef.current.setCustomValidity("")
      this.setState({
        usernamePrompt: "username can not be empty",
        passwordPrompt: "password can not be empty",
      });
      this.setState({
        [event.target.name]: event.target.value,
      });
    };
    const handleSubmit = (event) => {
      let _this = this;
      const form = event.currentTarget;
      
      _this.usernameRef.current.setCustomValidity("");
      if (!form.checkValidity()) {
        this.setState({
          validated: true,
          usernamePrompt:
            "Please enter valid username with its length greater than 6.",
        });
      } else {
        jwt.login(this.state.username,this.state.password)
          .then((response) => {
            
            _this.setState({
              validated: false,
            });
            if (response.status == 200) {
              this.setState({
                goto: "/profile",
              });
              jwt.getUser().then(user=>{
                
              })
            }
          })
          .catch(function (error) {
            _this.usernameRef.current.setCustomValidity("Duplicated username");
            _this.passwordRef.current.setCustomValidity("11")
            _this.setState({
              validated: true,
              usernamePrompt: "username or password incorrect",
              passwordPrompt:"username or password incorrect"
            });
            
          });
      }
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <div >      <h1>
      <b>Post-Ed</b>
    </h1> 
      <div id="form">
        {this.state.goto && <Navigate to={this.state.goto} replace={false} />}
        <Form style={{padding:"1rem"}}
          noValidate
          validated={this.state.validated}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              value={this.state.username}
              name="username"
              onChange={onchange}
              type="text"
              placeholder="Enter username"
              ref={this.usernameRef}
              required
            />
            <Form.Control.Feedback type="invalid">
              {this.state.usernamePrompt}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              looks good
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              onChange={onchange}
              value={this.state.password}
              type="password"
              placeholder="Password"
              ref={this.passwordRef}
              required
            />
            <Form.Control.Feedback type="invalid">
             {this.state.passwordPrompt}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              looks good
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Link style={{"float":"right"}} to="/register">
          <Button variant="light" type="button">
          Sign up
          </Button>
          </Link>
        </Form>
      </div>
      </div>
    );
  }
}

export default LoginModal;
