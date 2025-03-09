import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useUpdateUserHook } from "./hooks/useUpdateUserHook";
import { EditFilled } from "@ant-design/icons";
const UpdateUser = ({ user }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate: UpdateUser, isPending } = useUpdateUserHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // form.resetFields();
  };

  const handleSubmit = (formData) => {
    console.log(formData);

    UpdateUser(
      { userId: user.id, userData: formData },
      {
        onSuccess: () => {
          handleCancel();
        },
      }
    );
  };

  // console.log(user.id);

  return (
    <>
      <Button
        size="middle"
        type="primary"
        title="Edit user"
        onClick={showModal}
      >
        <EditFilled />
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
            name: user.name || "",
            email: user.email || "",
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

          <Button type="primary" htmlType="submit" loading={isPending} block>
            Update User
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateUser;
