import React from "react";
import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

import Auth from "../../utils/auth.js";

import { Layout, Space, Typography, Button } from "antd";

import HomeImage from "../../assets/images/TalliHome.png";
import Dashboard from "../../components/Dashboard/index.js";

const { Content } = Layout;

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

          <Typography.Title style={{textAlign: "center", color: "var(--green)"}}>
            How it works!
          </Typography.Title>

          <Layout>
            <Content>
              <img src={HomeImage}></img>
            </Content>
          </Layout>

          
        </>
      )}
    </div>
  );
};

export default Home;
