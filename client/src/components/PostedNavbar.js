import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "./Home.css";

const PostedNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
      <a href="/" style={{textDecoration: 'none', color: 'inherit'}}><h1>Post-ed</h1></a>
        <Navbar.Brand href="/"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile/2">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PostedNavbar;
