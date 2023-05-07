
import { Link } from "react-router-dom";
import DashboardImage from "../../assets/images/TalliDashboard.png"


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



const Dashboard = ({groups, friends, me}) => {

  console.log(me)

  const { Meta } = Card;
   
  

    return (
        <div>
           <Typography.Title>My Dashboard</Typography.Title>
          <Button href="./groups">Groups</Button>
            <Space>
              <Link to={"/groups"}>
                <Card
                hoverable
                style={{
                width: 240,
                }}
                cover={<img alt="example" src={DashboardImage} />}
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
                  cover={<img alt="example" src={DashboardImage} />}
                >
                <Meta title="Me" />
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
    )
}



export default Dashboard;