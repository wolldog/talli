import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const SideMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        onClick={(item) => {
          navigate(item.key);
        }}
        items={[
          {
            label: "Dashboard",
            icon: <DashboardOutlined />,
            key: "/dashboard",
          },
          { label: "Login", icon: <TeamOutlined />, key: "/login" },
          { label: "Join", icon: <UserOutlined />, key: "/join" },
          { label: "Home", icon: <ClockCircleOutlined />, key: "/" },
        ]}
      ></Menu>
    </div>
  );
};

export default SideMenu;
