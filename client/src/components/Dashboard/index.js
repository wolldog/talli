import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import GroupImage from "../../assets/images/groups2.png";
import FriendsImage from "../../assets/images/friends2.png";
import TransImage from "../../assets/images/transactions2.png";

import { Card, Space } from "antd";

import { QUERY_ME } from "../../utils/queries.js";

const Dashboard = () => {
const { Meta } = Card;

  const { data } = useQuery(QUERY_ME);

  return (
    <div>
      <Space wrap align="center" >

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
      </Space>
    </div>
  );
};

export default Dashboard;
