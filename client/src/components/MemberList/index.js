import React from "react";
import {
  Avatar,
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
    <div className="memberList" style={{ width: 350, margin: "auto" }}>
      <List
        size="large"
        header={<div>Group Members</div>}
        dataSource={members}
        bordered={true}
        renderItem={(item, index) => (
          <List.Item
            actions={[<a key="remove">Remove</a>]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
              }
              title={item.nickname}
              description={item.email}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default MemberList;
