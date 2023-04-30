import React from "react";
import { DashboardOutlined, TeamOutlined, UserOutlined, ClockCircleOutlined } from "@ant-design/icons"
import { Menu } from "antd";

const SideMenu = () => {
  return (
    <div className="SideMenu">
      <Menu items={[
        { label: "Dashboard", icon: <DashboardOutlined />, key: "/" },
        { label: "Groups",  icon: <TeamOutlined />, key:"/groups" },
        { label: "Friends",  icon: <UserOutlined />, key:"/friends" },
        { label: "Events",  icon: <ClockCircleOutlined />, key:"/events" }
        ]}>
        </Menu>
    </div>
  );
};

export default SideMenu;
