import React from "react";
import { useMutation } from "@apollo/client";

import { Button, Input, Form, message, Divider} from "antd";

import { ADD_MEMBER } from "../../utils/mutations";

const MemberForm = ({ groupId, gofetch }) => {
  const [addMember, { error }] = useMutation(ADD_MEMBER);

  const onFinish = async ({ email }) => {
    try {
      const { error } = await addMember({
        variables: {
          groupId,
          email,
        },
      });
      gofetch();
      message.success(`New group member has been added`);
    } catch (err) {
      message.error(
        "We can't find a Talli member with that email. Why not invite your friend to join?"
      );
    }
  };

  return (
    <div style={{border: "0.2px solid lightgray", borderRadius: "5px"}}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          margin: "auto",
        }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <div style={{padding: "15px"}}>
        <h3>Add Members</h3>
        <Divider></Divider>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default MemberForm;
