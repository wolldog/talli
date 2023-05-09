import React from "react";
import { Space, Typography, Row, Col, Card } from "antd";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_GROUP } from "../../utils/queries";

import MemberList from "../../components/MemberList";
import MemberForm from "../../components/MemberForm";
import TransactionList from "../../components/TransactionList";
import AddTransactionForm from "../../components/AddTransaction";

import FriendList from "../../components/FriendList";
import { GroupSizeContext } from "antd/es/button/button-group";

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
      <Row>
        <Col span={24}>
          <Typography.Title>{group.groupname}</Typography.Title>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 50 }}>
        <Col span={12}>
          <div className="transactionForm">
            <AddTransactionForm groupId={groupId}/>
          </div>
        </Col>
        <Col span={12}>
        <Card
      title="Groups Total Expenses"
      style={{
        width: 300,
      }}
    >
      <Typography>{group.totalgroupexpenses}</Typography>
    </Card>
          <MemberForm groupId={groupId} />
          <MemberList members={group.members} />
          <TransactionList transactions = {group.transactions} />
          
          {/* <div>
        <FriendList />
        </div> */}
        </Col>
      </Row>
    </div>
  );
};

export default SingleGroup;
