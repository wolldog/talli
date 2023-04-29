import React from "react";
import { Link } from "react-router-dom";

import { Layout } from "antd";
const { Header } = Layout;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 90,
  paddingInline: 50,
  lineHeight: "48px",
  backgroundColor: "#16c172",
  fontSize: "48px",
  
};

const brandLink ={
    color: "#fff",
    fontSize: "40px",
}

const PageHeader = () => {
  return (
    <Layout className="layout">
      <Header style={headerStyle}>
      <Link style={brandLink} to="/">
                Tally
              </Link>
      </Header>
    </Layout>
  );
};

export default PageHeader;
