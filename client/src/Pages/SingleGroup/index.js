import React from "react";
import { Space, Typography } from "antd";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_GROUP } from "../../utils/queries";

import MemberList from "../../components/MemberList";
import MemberForm from "../../components/MemberForm";

import FriendList from "../../components/FriendList";

const SingleGroup = () => {
  
  const { groupId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_GROUP, {
    // pass URL parameter
    variables: { groupId: groupId },
  });

  const group = data?.group || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography.Title>{group.groupname}</Typography.Title>
      <Space>
        <div className="MemberList">
          <MemberList members={group.members} />
        </div>
        <div>
          <MemberForm groupId={group._id} />
        </div>
        <div>
        <FriendList />
        </div>
      </Space>
    </div>
  );
};

export default SingleGroup;
