import React from "react";
import { Typography } from "antd";
import DashboardImage from "../../assets/images/TalliDashboard.png"

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Typography.Title>My Dashboard</Typography.Title>
      <img src={ DashboardImage } />
    </div>
  );
};

export default Dashboard;
