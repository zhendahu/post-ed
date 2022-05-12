import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  let first_space = [];
  for (var i = 0; i < 6; i++) {
    first_space.push(<br />);
  }
  let second_space = [];
  for (var i = 0; i < 4; i++) {
    second_space.push(<br />);
  }
  let third_space = [];
  for (var i = 0; i < 3; i++) {
    third_space.push(<br />);
  }

  return (
    <div >
      {first_space}
      <h1>
        <center>Post-Ed</center>
      </h1>
      {second_space}
        <Link to="/login">
          <Button variant="primary" size="xxl">
          &nbsp;Login&nbsp;
          </Button>
        </Link>
        {third_space}
        <Link to="/register">
          <Button variant="primary" size="xxl">
          &nbsp;Sign Up&nbsp;
          </Button>
        </Link>
    </div>
  );
}

export default Home;
