import React from "react";
import { Typography } from "antd";
import HomeImage from "../../assets/images/TalliHome.png"

const Home = () => {
  return (
    <div className="home">
      <Typography.Title style={{color: "var--green"}}>How it works!</Typography.Title>
      <img src={HomeImage} fluid ></img>
    </div>
  );
};

export default Home;
