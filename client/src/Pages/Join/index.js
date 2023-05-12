import { useState } from "react";
import { Space, Typography } from "antd";
import { ADD_USER } from "../../utils/mutations.js";
import { useMutation } from "@apollo/client";
import Agreement from "../../assets/docs/ServiceAgreement(draft).pdf"
import { PlusOutlined } from "@ant-design/icons";
import Auth from '../../utils/auth.js';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Upload,
} from "antd";

const { Option } = Select;

const Join = () => {

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onFinish = async (event) => {

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };
  
  const [form] = Form.useForm();

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="61">+61</Option>
        <Option value="64">+64</Option>
      </Select>
    </Form.Item>
  );

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 12,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="join">
      <Typography.Title> Join Talli </Typography.Title>
      <Form
        {...formItemLayout}
        form={form}
        name="join"
        onFinish={onFinish}
        initialValues={{
          prefix: "61",
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="text"
                  value={formState.email}
                  onChange={handleChange}/>
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password className="form-input"
                  placeholder="password"
                  name="password"
                  type="text"
                  value={formState.email}
                  onChange={handleChange} />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Nickname"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input className="form-input"
                  placeholder="Enter your the name your friends use"
                  name="nickname"
                  type="text"
                  value={formState.nickname}
                  onChange={handleChange}/>
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
            className="form-input"
                  placeholder="Enter you phone number"
                  name="phone"
                  type="text"
                  value={formState.phone}
                  onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href={Agreement}>agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Space>
          <Button type="primary" htmlType="submit">
            Join
          </Button>
          <Button type="default" href="/">Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Join;
