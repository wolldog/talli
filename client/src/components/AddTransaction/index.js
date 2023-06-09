//Import dependencies from react, apollo/client, antd, utils/mutations
import { PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_TRANSACTION } from "../../utils/mutations.js";
import { Button, DatePicker, Form, Input, Radio, Upload } from "antd";

//declare antd variables
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

//AddTransactionForm function; props 'groupId' and 'gofetch' from Page/SingleGroup
const AddTransactionForm = ({ groupId, gofetch }) => {

  const [form] = Form.useForm();

  const [formState, setFormState] = useState({
    transactionname: "",
    description: "",
    amountpaid: 0,
    attachment: "",
  });

  const [addTransaction, { error }] = useMutation(ADD_TRANSACTION);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: name === "amountpaid" ? parseFloat(value) : value,
    });
  };

  const onFinish = async (event) => {
    console.log(formState, groupId);

    try {
      const { data } = await addTransaction({
        variables: { ...formState, groupId },
      });
      gofetch();
      form.resetFields();

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form
      form={form}
      labelCol={{
        span: 20,
      }}
      wrapperCol={{
        span: 30,
      }}
      onFinish={onFinish}
      layout="vertical"
      style={{
        maxWidth: 2000,
      }}
      initialValues={{
        price: {
          number: 0,
          currency: "dollar",
        },
      }}
    >
      <h2>Transaction Form</h2>
      <Form.Item label="Transaction type">
        <Radio.Group>
          <Radio value="groupdebit"> Paid on behalf of group </Radio>
          <Radio value="groupcredit"> Paid to group </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Name"
        name="transactionname"
        rules={[
          {
            required: true,
            message: "Please include a name for the transaction!",
          },
        ]}
      >
        <Input
          className="form-input"
          placeholder="For example 'Coffee'"
          name="transactionname"
          // type="text"
          value={formState.transactionname}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Date of transaction">
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="amountpaid"
        label="Amount paid"
        // rules={[{ required: true, message: 'Please input amount paid!' }]}
      >
        <Input
          style={{ width: "100%" }}
          className="form-input"
          placeholder="$0.00"
          name="amountpaid"
          value={formState.amountpaid}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea
          rows={4}
          className="form-input"
          placeholder="For everyone on the trip"
          name="description"
          type="text"
          value={formState.description}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        label="Upload receipt"
        name="attachment"
        value=""
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
      <Form.Item label="Button">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddTransactionForm;
