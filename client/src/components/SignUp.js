import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import "./Home.css";
import { Navigate } from "react-router-dom";

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      username: "q1251640657",
      password: "123456",
      email: "guiminrui215@gmail.com",
      usernamePrompt:"Please enter valid username with its length greater than 6.",
      goto:""
    };
    this.password = React.createRef();
    this.confirmedPassword = React.createRef();
    this.usernameRef = React.createRef();
  }
  
  componentDidMount() {
    var password = this.password.current,
      confirm_password = this.confirmedPassword.current;

    function validatePassword() {
      if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
      } else {
        confirm_password.setCustomValidity("");
      }
    }

    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;
  }

  render() {

    const handleSubmit = (event) => {
      let _this =this;
      const form = event.currentTarget;
      console.log("handle submit", form.checkValidity());
      _this.usernameRef.current.setCustomValidity("")
      if (!form.checkValidity()) {
        this.setState({
          validated: true,
          usernamePrompt:"Please enter valid username with its length greater than 6."
        });
      } else {
        axios
          .post("/api/users/", {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            groups: [],
          })
          .then( (response)=>{
            console.log(response);
            _this.setState({
              validated: false,
            });
            if(response.status==201){
              
              this.setState({
                goto:"/"
              })
            }
          })
          .catch(function (error) {
            _this.usernameRef.current.setCustomValidity("Duplicated username")
            _this.setState({
              validated: true,
              usernamePrompt:"Duplicated username"
            });
            console.log(error);
          });
      }
      event.preventDefault();
      event.stopPropagation();
    };
    const onchange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };
    return (
      <div id="form">
        {this.state.goto && (
          <Navigate to={this.state.goto} replace={true} />
        )}
        <Form
          noValidate
          style={{ margin: "1rem" }}
          validated={this.state.validated}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              pattern="^[a-zA-z0-9]{6,}$"
              value={this.state.username}
              required
              onChange={onchange}
              name="username"
              ref={this.usernameRef}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.usernamePrompt}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              looks good
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={this.state.email}
              placeholder="Enter email"
              required
              onChange={onchange}
              name="email"
            />
            <Form.Control.Feedback type="invalid">
              Please enter valid emaill adress
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              looks good
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={this.password}
              type="password"
              minLength={6}
              placeholder="Password"
              value={this.state.password}
              onChange={onchange}
              name="password"
            />
            <Form.Control.Feedback type="invalid">
              
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              looks good
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmedPassword">
            <Form.Label>Password Again</Form.Label>
            <Form.Control
              ref={this.confirmedPassword}
              type="password"
              minLength="6"
              placeholder="Password"
              required
              value='123456'
            />

            <Form.Control.Feedback type="invalid">
              Please enter the same password again.
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              looks good
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default SignUpModal;
