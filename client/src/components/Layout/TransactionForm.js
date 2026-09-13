import { Form, Input, Select, InputNumber, DatePicker } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";

const TransactionForm = ({ onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        amount: initialValues.amount,
        type: initialValues.type,
        category: initialValues.category,
        reference: initialValues.reference,
        description: initialValues.description,
        date: initialValues.date ? dayjs(initialValues.date) : null,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => {
        if (values.date) {
          values.date = values.date.toISOString(); 
        }
        onSubmit(values);
      }}
    >
      <Form.Item label="Amount" name="amount">
        <InputNumber className="w-100" />
      </Form.Item>

      <Form.Item label="Type" name="type">
        <Select>
          <Select.Option value="income">Income</Select.Option>
          <Select.Option value="expense">Expense</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Category" name="category">
        <Select>
          <Select.Option value="Salary">Salary</Select.Option>
          <Select.Option value="Fees">Fees</Select.Option>
          <Select.Option value="Food">Food</Select.Option>
          <Select.Option value="Bill">Bill</Select.Option>
          <Select.Option value="Medical">Medical</Select.Option>
          <Select.Option value="Other">Other</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Reference" name="reference">
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input />
      </Form.Item>

      <Form.Item label="Date" name="date">
        <DatePicker className="w-100" />
      </Form.Item>

      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </Form>
  );
};

export default TransactionForm;
