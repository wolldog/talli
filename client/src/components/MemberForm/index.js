import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

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
    Form
  } from "antd";


import { ADD_MEMBER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const MemberForm = ({ groupId }) => {

    const [newMember, setNewMember] = useState('');

    const [addMember, { error }] = useMutation(ADD_MEMBER);

    const onFinish = async (newMember) => {

      console.log(newMember, groupId)
        
        try {
          const { data } = await addMember({
            variables: {
                groupId,
                newMember,
            },
          });

          setNewMember('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'newMember') {
      setNewMember(value);
    }
  };

//   const onFinish = (values) => {
//     console.log('Success:', values);
//   };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
    }}
    
    onChange={handleChange}
    onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
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
  )
};

export default MemberForm;