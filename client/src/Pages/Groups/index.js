import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, Navigate } from "react-router-dom";
import Auth from "../../utils/auth.js";
import GroupDefault from "../../assets/images/groups2.png";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

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
} from "antd";

import { QUERY_ME } from "../../utils/queries.js";
import { ADD_GROUP } from "../../utils/mutations.js";

const { Meta } = Card;

const Groups = () => {
  let isActivated = false;

  const { loading, data, refetch } = useQuery(QUERY_ME);
  useEffect(() => {
    refetch();
  }, [isActivated]);

  const groups = data?.me.groups || [];

  const [addGroup, { error }] = useMutation(ADD_GROUP);

  const handleAddGroup = async () => {
    try {
      const { data } = await addGroup({
        variables: { ...formState },
      });

      setOpen(false);
      setFormState({ groupname: "" });
      isActivated = !isActivated;
      refetch();
    } catch (err) {
      if (err) {
      }
    }
  };

  const [formState, setFormState] = useState({
    groupname: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      [name]: value,
    });
  };

  //Modal

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const [confirmLoading, setConfirmLoading] = useState(false);

  // const [modalText, setModalText] = useState("Content of the modal");
  const style = {
    cardsStyle: { padding: "20px 20px" },
  };
  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="groups">
        {Auth.loggedIn() ? (
          <>
            {groups.length === 0 ? (
              <Row justify="center">
                <Col span={24}>
                  <Typography.Title>Create a group to begin </Typography.Title>
                </Col>
              </Row>
            ) : null}

            <Row justify="center">
              <Col span={4}>
                <Button onClick={showModal} type="primary" >
                  Add a group
                </Button>
                {error ? (
                  <>
                    <p className="error-text">
                      The provided credentials are incorrect
                    </p>
                  </>
                ) : null}
              </Col>
            </Row>

            <div>
              <Modal
                title="Add a group"
                open={open}
                onOk={({ target }) => {
                  setConfirmLoading();
                  console.log(target);
                  handleAddGroup(target);
                  setFormState({ groupname: "" });
                  setOpen(false);
                }}
                okText="Add Group"
                confirmLoading={confirmLoading}
                onCancel={() => {
                  setOpen(false);
                }}
              >
                <Input
                  placeholder="Enter your group name"
                  className="modalInput"
                  name="groupname"
                  type="text"
                  value={formState.groupname}
                  onChange={handleChange}
                ></Input>
              </Modal>
            </div>

            <Divider />
            <Space wrap>
              <div style={style.cardsStyle}>
                {groups &&
                  groups.map((group) => (
                    <div className="groupCard" key={group._id}>
                      <Link className="cardLink" to={`./${group._id}`}>
                        <Card
                          style={{
                            width: 300,
                          }}
                          cover={<img alt="example" src={GroupDefault} />}
                          actions={[
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                          ]}
                        >
                          <Meta
                            avatar={
                              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                            }
                            title={group.groupname}
                          />
                        </Card>
                      </Link>
                    </div>
                  ))}
              </div>
            </Space>
          </>
        ) : (
          <Navigate to="/" replace={true} />
        )}
      </div>
    );
  }
};

export default Groups;
