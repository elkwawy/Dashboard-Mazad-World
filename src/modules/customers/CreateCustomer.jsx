import { Button, Form, Input, Modal, Spin } from "antd";
import { useState } from "react";
import { useCreateCustomerHook } from "./hooks/useCreateCustomerHook";

const CreateCustomer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate: addNewCustomer, isPending } = useCreateCustomerHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (formData) => {
    addNewCustomer(formData, {
      onSuccess: () => {
        handleCancel();
      },
    });
  };

  return (
    <>
      <Button type="primary" className="add-btn" onClick={showModal}>
        Add Customer
      </Button>
      <Modal
        title="Create New Customer"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            name: "",
            email: "",
            phone: "",
            location: "",
            note: "",
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Enter name" allowClear />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email" allowClear />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Phone is required" }]}
          >
            <Input placeholder="Enter phone number" allowClear />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Location is required" }]}
          >
            <Input placeholder="Enter location" allowClear />
          </Form.Item>

          <Form.Item name="note" label="Note">
            <Input.TextArea placeholder="Enter any notes" allowClear />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isPending} block>
            Add New Customer
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CreateCustomer;
