import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { ChatState } from "../Context/ChatProvider"; // ✅ import context

function Homepage() {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  const { setUser } = ChatState(); // ✅ get context values

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    setUser(user); // ✅ correctly set context user

    if (user) {
      navigate("/chat");
    }
  }, [navigate, setUser]);

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Card
        className="p-4 shadow-lg"
        style={{ minWidth: "400px", width: "40%" }}
      >
        <Card.Body>
          <h2 className="text-center mb-4 text-primary fw-bold">Chat App</h2>
          <ButtonGroup className="w-100 mb-4">
            <Button
              variant={activeTab === "login" ? "primary" : "outline-primary"}
              onClick={() => setActiveTab("login")}
            >
              Login
            </Button>
            <Button
              variant={activeTab === "signup" ? "primary" : "outline-primary"}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </Button>
          </ButtonGroup>
          {activeTab === "login" ? <Login /> : <Signup />}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Homepage;
