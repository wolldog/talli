import React from "react";
import { useMutation } from "@apollo/client";

import { Button, Input, Form } from "antd";

import { ADD_MEMBER } from "../../utils/mutations";

const MemberForm = ({ groupId, gofetch }) => {
  // const [newMember, setNewMember] = useState("");

  const [addMember, { error }] = useMutation(ADD_MEMBER);

  const onFinish = async ({ email }) => {
    console.log(email);
    // console.log(newMember, groupId);

    try {
      const { data } = await addMember({
        variables: {
          groupId,
          email,
        },
      });
      gofetch();
      // setNewMember("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
  };
  // if (name === "newMember") {
  //   setNewMember(value);
  // }
  // };

  return (
    <div>
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
        onChange={handleChange}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h3>Add Members</h3>
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
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MemberForm;
