import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import DashboardImage from "../../assets/images/TalliDashboard.png";
import GroupImage from "../../assets/images/groups.png";
import FriendsImage from "../../assets/images/friends1.png";
import TransImage from "../../assets/images/transactions.png";
import Auth from "../../utils/auth.js";

import { Card, Space, Button, Typography } from "antd";

import { QUERY_ME } from "../../utils/queries.js";

const Dashboard = () => {
  const { Meta } = Card;

  const { loading, data } = useQuery(QUERY_ME);
  // const me = data?.me || {};

  return (
    <div>
      {/* <Typography.Title>My Dashboard</Typography.Title>
          <Button href="./groups">Groups</Button> */}
      <Space>
        <Link to={"/groups"}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<img alt="example" src={GroupImage} />}
          >
            <Meta title="My Groups" />
          </Card>
        </Link>

        <Link>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<img alt="example" src={FriendsImage} />}
          >
            <Meta title="My Friends" />
          </Card>
        </Link>

        <Link>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<img alt="example" src={TransImage} />}
          >
            <Meta title="My Transactions" />
          </Card>
        </Link>

        <Card
          hoverable
          style={{
            width: 240,
          }}
          cover={<img alt="example" src={DashboardImage} />}
        >
          <Meta title="I owe" />

          <p>Me</p>
        </Card>

        <Card
          hoverable
          style={{
            width: 240,
          }}
          cover={<img alt="example" src={DashboardImage} />}
        >
          <Meta title="I am owed" /> <p>Me</p>
        </Card>
      </Space>
    </div>
  );
};

export default Dashboard;
