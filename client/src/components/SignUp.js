import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import "./Home.css";
import { Navigate } from "react-router-dom";
import jwt from "../utils/jwt.js";
import { Link } from "react-router-dom";
class SignUpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      username: "",
      name: "",
      group: "",
      password: "",
      confirmedPassword: "",
      email: "",
      usernamePrompt:
        "Please enter valid username with its length greater than 6.",
      avatar: "",
      goto: "",
    };
    this.password = React.createRef();
    this.confirmedPassword = React.createRef();
    this.usernameRef = React.createRef();
    this.fileUploadRef = React.createRef();
    document.addEventListener("submit", (event) => {
      console.log("submit", event);
    });
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

  submitUserInfo(image_url) {
    let _this = this;
    axios
      .post("/api/users/", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        groups: [],
        image_url: image_url,
        last_name:this.state.name,
        team_set: [],
      })
      .then((response) => {
        console.log(response);
        _this.setState({
          validated: false,
        });
        if (response.status == 201) {
          this.setState({
            goto: "/login",
          });
        }
      })
      .catch(function (error) {
        _this.usernameRef.current.setCustomValidity("Duplicated username");
        _this.setState({
          validated: true,
          usernamePrompt: "Duplicated username",
        });
        console.log(error);
      });
  }

  render() {
    const handleSubmit = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const form = event.currentTarget;
      let _this = this;
      _this.usernameRef.current.setCustomValidity("");
      if (!form.checkValidity()) {
        this.setState({
          validated: true,
          usernamePrompt:
            "Please enter valid username with its length greater than 6.",
        });
      } else {
        var formData = new FormData();
        var imagefile = this.fileUploadRef.current;
        if (imagefile.files.length) {
          formData.append("image", imagefile.files[0]);
          formData.append("username", this.state.username);
          jwt.clearToken();
          axios
            .post("user/avatar_upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              console.log("formdata", event.nativeEvent);
              this.submitUserInfo(res.data.image_url);
            })
            .catch((err) => {
              console.log("file err:", err);
            });
        } else {
          this.submitUserInfo("111");
        }
      }

      return;
    };
    const onchange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };
    return (
      <div>
        <h1>
          <b>Post-Ed</b>
        </h1>
        <div id="form">
          {this.state.goto && <Navigate to={this.state.goto} replace={true} />}
          <Form
            noValidate
            style={{ padding: "1rem" }}
            validated={this.state.validated}
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3" controlId="formBasicUserName">
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
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={this.state.name}
                required
                onChange={onchange}
                name="name"
              />
              <Form.Control.Feedback type="invalid">
                name can not be empty
              </Form.Control.Feedback>
              <Form.Control.Feedback type="valid">
                looks good
              </Form.Control.Feedback>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicGroup">
            <Form.Label>Group</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={this.state.group}
              required
              onChange={onchange}
              name="group"
            />
            <Form.Control.Feedback type="invalid">
              group can not be empty
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              looks good
            </Form.Control.Feedback>
          </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicAvatar">
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="file"
                ref={this.fileUploadRef}
                value={this.state.avatar}
                onChange={onchange}
                name="avatar"
                accept=".jpeg,.jpg,.png"
                required
              />
              <Form.Control.Feedback type="invalid">
                group can not be empty
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
                minLength="6"
                placeholder="Password"
                value={this.state.password}
                onChange={onchange}
                name="password"
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
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
                name="confirmedPassword"
                value={this.state.confirmedPassword}
                onChange={onchange}
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

            <Link style={{ float: "right" }} to="/login">
              <Button variant="light" type="button">
                Sign in
              </Button>
            </Link>
            {/* <Button variant="primary" type="submit">
            Return
          </Button> */}
          </Form>
        </div>
      </div>
    );
  }
}

export default SignUpModal;
