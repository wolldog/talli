import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from 'react-router-dom'
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
  Select,
  Form,
  Typography,
} from "antd";

import { QUERY_USERS_GROUPS } from "../../utils/queries.js";
import { ADD_GROUP } from "../../utils/mutations.js";

const { Meta } = Card;

const Groups = () => {
  //Retrieve the groups the currently logged in user belongs to
  const { loading, data } = useQuery(QUERY_USERS_GROUPS);

  //Declare variable 'groups' to hold retrieved data.
  const groups = data?.groups || {};
  console.log(groups);

  const [addGroup, { error }] = useMutation(ADD_GROUP);

  const handleAddGroup = async () => {
    try {
      const { data } = await addGroup({
        variables: { ...formState },
      });

      setOpen(false);
      setFormState({ groupname: "" });
    } catch (err) {
      if(err) {

      };
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="groups">
      {groups.length === 0 ? (
        <Row justify="center">
          <Col span={24}>
            <Typography.Title>Create a group to begin </Typography.Title>
          </Col>
        </Row>
      ) : (
       null
      )}

      <Row justify="center">
        <Col span={4}>
          <Button type="primary" onClick={showModal}>
            Add a group
          </Button>
          {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
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
        {groups &&
          groups.map((group) => (
            <div className="groupCard" key={group._id}>
              
              <Card
                style={{
                  width: 300,
                }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
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
             
            </div>
          ))}
      </Space>
    </div>
  );
};

export default Groups;
