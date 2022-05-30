import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import jwt from "../utils/jwt.js";
import axios from "axios";
import "./Home.css";

const PostedNavbar = () => {
  const [userInfo, setUserInfo] = useState(0);
  const [teamsInfo, setTeamsInfo] = useState([]);
  useEffect(() => {
    jwt.getUser().then(user => {
      console.log(user);
      setUserInfo(user);
    })
    try {
      if (userInfo.team_set && userInfo.team_set.length === 0) {
        userInfo.team_set = 'None';
      } else {
        for (let i = 0; i < userInfo.team_set.length; i++) {
          axios.get(userInfo.team_set[i]).then(res => teamsInfo[i] = res.data.team_name);
        }
        setTeamsInfo(teamsInfo)
      }
    } catch (e) {
      console.log(e);
    }
  }, [userInfo.username, userInfo.email, teamsInfo.length]);



  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}><h1>Post-ed</h1></a>
        <Navbar.Brand href="/"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <NavDropdown title="Groups" id="basic-nav-dropdown">
              {teamsInfo !== 'None' && teamsInfo.map((value, index) => {
                return (
                  <NavDropdown.Item key={index}>{value}</NavDropdown.Item>
                );
              })}
              {teamsInfo !== 'None' && <NavDropdown.Divider></NavDropdown.Divider>}
              <NavDropdown.Item href="/creategroup">Create Group</NavDropdown.Item>
              <NavDropdown.Item href="/joingroup">Join Group</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PostedNavbar;
