import { useState } from "react";
import { Button, Form, Input, Typography, Space, message } from "antd";
import Auth from "../../utils/auth.js";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations.js";

const Login = () => {
  const [form] = Form.useForm();

  const [formState, setFormState] = useState({ email: "", password: "" });

  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const onFinish = async (event) => {
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.loginUser.token);
    } catch (e) {
      console.error(e);
      message.error(
        "Login failed: we do not recognise that email, password combination"
      );
      form.resetFields();
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <Typography.Title>Login</Typography.Title>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Email" name="email">
          <Input
            required
            placeholder="Your email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password
            required
            placeholder="Your password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Space>
          <Button type="default" htmlType="submit">
            Login
          </Button>
          <Button type="default" href="/">Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
