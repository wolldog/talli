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


const TransactionList = ({ transactions = []}) => {
  if (!transactions.length) {
    return (
      <Typography.Text>
        No transactions yet!
      </Typography.Text>
    );

  }

  return (
    <div className="transactionList" style={{ width: 350, margin: "auto" }}>
      <List
        size="large"
        header={<div>Group transactions</div>}
        dataSource={transactions}
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
              title={item.transactionname}
              description={item.amountpaid}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default TransactionList;