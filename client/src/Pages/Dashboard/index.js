import React from "react";
import { Typography } from "antd";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Typography.Text>This will use the user id from the token to pull the currently logged in user data</Typography.Text>
    </div>
  );
};

export default Dashboard;
