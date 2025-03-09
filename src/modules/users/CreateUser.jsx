import { Button, Form, Input, Modal, Spin } from "antd";
import { useState } from "react";
import { useCreateUserHook } from "./hooks/useCreateUserHook";
const CreateUser = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate: addNewUser, isPending } = useCreateUserHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (formData) => {
    addNewUser(formData, {
      onSuccess: () => {
        handleCancel();
      },
    });
  };

  return (
    <>
      <Button type="primary" className="add-btn" onClick={showModal}>
        Add User
      </Button>
      <Modal
        title="Create New User"
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
            password: "",
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
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Enter password" allowClear />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isPending} block>
            Add New User
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CreateUser;
