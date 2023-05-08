import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Auth from "../../utils/auth.js";

import {
  Card,
  Space,
  Typography,
  Button,
} from "antd";

import DashboardImage from "../../assets/images/TalliDashboard.png";
import HomeImage from "../../assets/images/TalliHome.png";

const Home = ({ groups, friends, me }) => {
  console.log(me);
  const navigate = useNavigate();
  const { Meta } = Card;

  return (
    <div className="home">
      {Auth.loggedIn() ? (
        <div>
          <Typography.Title>My Dashboard</Typography.Title>

          <Space>
            <Link to={"/groups"}>
              <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={<img alt="example" src={DashboardImage} />}
              >
                <Meta title="My Groups" />
              </Card>
            </Link>

            <Link>
              <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={<img alt="example" src={DashboardImage} />}
              >
                <Meta title="My Friends" />
              </Card>
            </Link>

            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={DashboardImage} />}
            >
              <Meta title="I owe" />

              <p>Me</p>
            </Card>

            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={DashboardImage} />}
            >
              <Meta title="I am owed" /> <p>Me</p>
            </Card>
          </Space>
        </div>
      ) : (
        <>
        <div style={{textAlign: "center"}}>
          <Space>
        <Button onClick={() => { navigate("/login") }}>Login</Button>
        <Button onClick={() => { navigate("/join") }}>Join</Button>
        </Space>
        </div>
          
        
          <Typography.Title style={{ color: "(var--green)", textAlign: "center" }}>
            How it works!
          </Typography.Title>
          <img src={HomeImage} fluid></img>
          </> 
      )}
    </div>
  );
};

export default Home;
