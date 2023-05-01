import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  ClockCircleOutlined,
  UnlockOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

import Auth from "../../utils/auth.js";

const SideMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="SideMenu">
      {Auth.loggedIn() ? (
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
      ) : (
        <Menu
          onClick={(item) => {
            navigate(item.key);
          }}
          items={[
            { label: "Login", icon: <UnlockOutlined />, key: "/login" },
            {
              label: "Join",
              icon: <LoginOutlined />,
              key: "/join",
            },
          ]}
        ></Menu>
      )}
    </div>
  );
};

export default SideMenu;
