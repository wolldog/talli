import { useEffect } from "react";
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
const style = {
  groupPage: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  groupTitle: {
    padding: "10px 100px 0 0",
  },
  totalExpenses: {
    padding: "10px 10px",
  },
  membersCard: {
    padding: "10px 10px",
  },
  expensesCard: {
    padding: "12px 10px",
  },
};
const SingleGroup = () => {
  const { groupId } = useParams();
  let isActivated = false;

  const { loading, data, refetch } = useQuery(QUERY_SINGLE_GROUP, {
    // pass URL parameter
    variables: { groupId: groupId },
  });

  useEffect(() => {
    refetch();
  }, [isActivated]);

  const group = data?.group || {};

  const updateActivated = () => {
    isActivated = !isActivated
    refetch()
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={style.groupPage}>
      <Row>
        <Col span={24}>
          <Typography.Title style={style.groupTitle}>
            {group.groupname}
          </Typography.Title>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 50 }}>
        <Col span={12}>
          <div className="transactionForm">
            <AddTransactionForm groupId={groupId} gofetch={updateActivated} />
          </div>
        </Col>
        <Col span={12}>
          <Card
            title="Groups Total Expenses"
            style={{
              width: 300,
            }}
          >
            <div style={style.totalExpenses}>
              <Typography>{group.totalgroupexpenses}</Typography>
            </div>
          </Card>
          <MemberForm groupId={groupId} gofetch={updateActivated} />
          <div style={style.membersCard}>
            <MemberList members={group.members} />
          </div>
          <div style={style.expensesCard}>
            <TransactionList transactions={group.transactions} />
          </div>
          {/* <div>
        <FriendList />
        </div> */}
        </Col>
      </Row>
    </div>
  );
};

export default SingleGroup;
