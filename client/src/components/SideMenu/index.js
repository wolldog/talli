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
          { label: "Home", icon: <ClockCircleOutlined />, key: "/" },
          {
            label: "Dashboard",
            icon: <DashboardOutlined />,
            key: "/dashboard",
          },
          { label: "Groups", icon: <TeamOutlined />, key: "/groups" },
          { label: "Friends", icon: <UserOutlined />, key: "/friends" },
          
        ]}
      ></Menu>
    </div>
  );
};

export default SideMenu;
