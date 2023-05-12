import React from "react";
import { Space, Typography, Button } from "antd";
import { DashboardOutlined } from "@ant-design/icons";
import headerImage from "./../../assets/images/talliLogo.png";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth.js";

const PageHeader = () => {
  const logout = (event) => {
    Auth.logout();
    window.location.assign("/");
    // navigate("../../");
  };
  return (
    <div className="PageHeader">
      <img src={headerImage} style={{ maxHeight: "75px" }} />

      <Space>
        {Auth.loggedIn() ? (
          <div>
            <Space>
              <Link to="/" replace={true}>
                <Typography>
                  {/* {Auth.getProfile().data.nickname}'s Dashboard{" "} */}
                  <DashboardOutlined
                    style={{ color: "black", fontSize: "30px" }}
                  ></DashboardOutlined>
                </Typography>
              </Link>
              <Button onClick={logout} style={{ margin: "10px" }}>
                Logout
              </Button>
            </Space>
          </div>
        ) : null}
      </Space>
    </div>
  );
};

export default PageHeader;
