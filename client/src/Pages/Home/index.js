import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth.js";

import {
  Card,
  Space,
  Typography,
} from "antd";

import DashboardImage from "../../assets/images/TalliDashboard.png";
import HomeImage from "../../assets/images/TalliHome.png";

const Home = ({ groups, friends, me }) => {
  console.log(me);

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
        <div>
          <Typography.Title style={{ color: "var--green" }}>
            How it works!
          </Typography.Title>
          <img src={HomeImage} fluid></img>
        </div>
      )}
    </div>
  );
};

export default Home;
