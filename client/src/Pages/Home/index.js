import React from "react";
import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

import Auth from "../../utils/auth.js";

import { Card, Space, Typography, Button } from "antd";

import HomeImage from "../../assets/images/TalliHome.png";
import Dashboard from "../../components/Dashboard/index.js";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      {Auth.loggedIn() ? (
        <div>
          <Typography.Title>My Dashboard</Typography.Title>

          <Space>
            <Dashboard />
          </Space>
        </div>
      ) : (
        <>
          <div style={{ textAlign: "end" }}>
            <Space>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/join");
                }}
              >
                Join
              </Button>
            </Space>
          </div>

          <Typography.Title style={{ color: "(var--green)" }}>
            How it works!
          </Typography.Title>

          <img src={HomeImage} fluid></img>
        </>
      )}
    </div>
  );
};

export default Home;
