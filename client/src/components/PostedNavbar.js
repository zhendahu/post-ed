import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import jwt from "../utils/jwt.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const PostedNavbar = () => {
  const [userInfo, setUserInfo] = useState(0);
  const [teamsInfo, setTeamsInfo] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    jwt.getUser().then(user => {
      
      setUserInfo(user);
    })
    try {
      if (userInfo.team_set && userInfo.team_set.length === 0) {
        userInfo.team_set = 'None';
      } else {
        for (let i = 0; i < userInfo.team_set.length; i++) {
          axios.get(userInfo.team_set[i]).then(res => teamsInfo[i] = { name: res.data.team_name, id: res.data.id });
        }
        setTeamsInfo(teamsInfo)
      }
    } catch (e) {
      
    }
  }, [userInfo.username, userInfo.email, teamsInfo.length]);

  const handleGroupClick = (value) => {
    navigate(`/group/${value.id}`)
    window.location.reload();
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}><h1>Post-ed</h1></a>
        <Navbar.Brand href="/"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/profile">Profile</Nav.Link>
            <NavDropdown title="Groups" id="basic-nav-dropdown">
              {teamsInfo !== 'None' && teamsInfo.map((value, index) => {
                return (
                  <NavDropdown.Item key={index} onClick={() => handleGroupClick(value)}>{value.name}</NavDropdown.Item>
                );
              })}
              {teamsInfo !== 'None' && <NavDropdown.Divider></NavDropdown.Divider>}
              <NavDropdown.Item href="/creategroup">Create Group</NavDropdown.Item>
              <NavDropdown.Item href="/joingroup">Join Group</NavDropdown.Item>
              <NavDropdown.Item href="/profile">Leave Group</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PostedNavbar;
