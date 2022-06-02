import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form,FormControl } from "react-bootstrap";
import jwt from "../utils/jwt.js";
import PostedNavbar from "./PostedNavbar";
import { useNavigate, Link } from "react-router-dom";
import "./JoinGroup.css";

const SearchGroup = () => {
  const [userInfo, setUserInfo] = useState(0);
  const [errorInfo, setErrorInfo] = useState("");
  useEffect(() => {
    jwt.getUser().then((user) => {
      setUserInfo(user);
    });
  }, [userInfo.url]);

  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const password = event.target[1].value;
    axios
      .patch("/api/teams/", {
        should_leave: false,
        id: userInfo.id,
        name: name,
        password: password,
      })
      .catch((error) => {
        return 0;
      })
      .then((code) => {
        if (code !== 0) {
          navigate("/profile");
        } else {
          setErrorInfo("Invalid group identifier or password");
        }
      });
  };

  return (
    <div>
      <PostedNavbar />
      <h2 style={{ marginBottom: "1em" }}>Search for an interesting group</h2>
      <Form  className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      <br></br>
      <br></br>

      <div>

      </div>
    </div>
  );
};

export default SearchGroup;
