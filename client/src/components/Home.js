import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  useEffect(() => {
    console.log("home");
  }, []);

  return (
    <div className="home-background1">
      <h1 style={{ marginBottom: "15vh", marginTop: "15vh" }}>
        <b className="title">Post-Ed</b>
      </h1>
      <Link to="/login">
        <Button
          variant="light"
          size="xxl"
          style={{
            fontSize: "2.3em",
            borderRadius: "30px",
            width: "10rem",
            color: "black",
            fontFamily: "Concert One ",
            fontWeight: "bold",
          }}
        >
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button
          variant="light"
          className="home-button"
          size="xxl"
          style={{
            fontSize: "2.3em",
            width: "10rem",
            borderRadius: "30px",
            color: "black",
            fontFamily: "Concert One ",
            fontWeight: "bold",
          }}
        >
          Sign Up
        </Button>
      </Link>
    </div>
  );
}

export default Home;
