import React from "react";
import { useQuery } from "@apollo/client";

import { Avatar, Button, Typography, List } from "antd";

import { QUERY_ME } from "../../utils/queries";
// import { ADD_MEMBER } from "../../utils/mutations"

const FriendList = () => {
  const { data } = useQuery(QUERY_ME);

  const friends = data?.me.friends || [];

  if (!friends.length) {
    return <Typography.Text>Add some friends to begin</Typography.Text>;
  }

  console.log(friends);

  return (
    <div className="friendList" style={{ width: 500 }}>
      <List
        size="large"
        header={
          <div>
            {" "}
            My Friends{" "}
            <Button style={{ margin: "auto 10px" }}>Add friend</Button>{" "}
          </div>
        }
        dataSource={friends}
        bordered={true}
        renderItem={(item, index) => (
          <List.Item
            actions={[<Button value={item._id}>Add friend to group</Button>]}
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

export default FriendList;
