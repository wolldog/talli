import React from "react";
import { useNavigate } from "react-router-dom";

import Auth from "../../utils/auth.js";

import { Layout, Space, Typography, Button } from "antd";

import HomeLrg from "../../assets/images/TalliHome.png";
import HomeMed from "../../assets/images/TalliMid.png"
import HomeSml from "../../assets/images/HomeMobile2.png"
import Dashboard from "../../components/Dashboard/index.js";

const { Content } = Layout;

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      {Auth.loggedIn() ? (
        <div>
          <Typography.Title style={{textAlign: "center"}}>My Dashboard</Typography.Title>

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
            <img
                  srcSet={`${HomeSml} 300w, ${HomeMed} 700w, ${HomeLrg} 1400w`}
                  sizes="(max-width: 500px) 500px, (max-width: 800px) 800px, 1100px"
                  alt="How it works step through process"
                  className="HomeImage"
                  src={HomeSml}
                />
            
            </Content>
          </Layout>

          
        </>
      )}
    </div>
  );
};

export default Home;
