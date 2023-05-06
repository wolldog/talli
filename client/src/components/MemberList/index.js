import React from "react";
import {
  Avatar,
  Card,
  Space,
  Divider,
  Button,
  Row,
  Col,
  Modal,
  Input,
  Typography,
  List,
} from "antd";

const MemberList = ({ members = [] }) => {
  if (!members.length) {
    return (
      <Typography.Text>
        You are looking a bit lonely, add some friends to your group
      </Typography.Text>
    );
  }

  return (
    <div className="memberList" style={{ width: 500 }}>
      <List
        size="large"
        header={<div>Group Members</div>}
        footer={
          <div>
            <Button>Add Member</Button>
          </div>
        }
        dataSource={members}
        bordered={true}
        renderItem={(item, index) => (
          <List.Item
            actions={[<a key="list-loadmore-edit">Remove from group</a>]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
              }
              title={<a href="https://ant.design">{item.nickname}</a>}
              description={item.email}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default MemberList;
