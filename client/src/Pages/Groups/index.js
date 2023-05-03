import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Space, Divider, Button, Row, Col, Modal } from "antd";
import { QUERY_USERS_GROUPS } from "../../utils/queries.js";

import { Typography } from "antd";

const { Meta } = Card;

const Groups = () => {
  //Retrieve the groups the currently logged in user belongs to
  const { loading, data } = useQuery(QUERY_USERS_GROUPS);

  //Declare variable 'groups' to hold retrieved data.
  const groups = data?.groups || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="groups">
      {groups.length === 0 ? (
        <Row justify="center">
          <Col span={24}>
            <Typography.Title>Create a group to begin </Typography.Title>
          </Col>
        </Row>
      ) : (
        <> </>
      )}

      
      <Space wrap>
        {groups &&
          groups.map((group, index) => (
            <div className="groupCard" key={index}>
              <Card
                style={{
                  width: 300,
                }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                  }
                  title={group.groupname}
                />
              </Card>
            </div>
          ))}
      </Space>
    </div>
  );
};

export default Groups;
