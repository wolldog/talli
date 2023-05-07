import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from 'react-router-dom';

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

import { QUERY_ME } from '../../utils/queries';
import { ADD_MEMEBER } from "../../utils/mutations"

const FriendList = () => {

  const { loading, data } = useQuery(QUERY_ME);

  const friends = data?.me.friends || [];

    if (!friends.length) {
      return (
        <Typography.Text>
          You are looking a bit lonely, add some friends to your group
        </Typography.Text>
      );
    }

    console.log(friends)
    const { groupId } = useParams();
    const [addMember, { error }] = useMutation(ADD_MEMEBER); 

    const handleOnClick = async (event) => {
      event.preventDefault();
  
      // try {
      //   const { data } = await addMember({
      //     variables: {
      //       groupId,
      //       commentText,
      //       commentAuthor: Auth.getProfile().data.username,
      //     },
      //   });
  
      //   setCommentText('');
      // } catch (err) {
      //   console.error(err);
      // }

      console.log(groupId, event)
    };
  
    return (
      <div className="friendList" style={{ width: 500 }}>
        <List
          size="large"
          header={<div> My Friends</div>}
          footer={
            <div>
              <Button>Add friend</Button>
            </div>
          }
          dataSource={friends}
          bordered={true}
          renderItem={(item, index) => (
            <List.Item
              actions={[<Button onClick={addMember}>Add friend to group</Button>]}
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
  
  export default FriendList;