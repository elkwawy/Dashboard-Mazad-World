import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useUpdateCustomerHook } from "./hooks/useUpdateCustomerHook";
import { EditFilled } from "@ant-design/icons";

const UpdateCustomer = ({ customer }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate: updateCustomer, isPending } = useUpdateCustomerHook();

  const showModal = () => {
    setIsModalVisible(true);
    form.setFieldsValue({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      location: customer.location || "",
      note: customer.note || "",
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (formData) => {
    updateCustomer(
      { customerId: customer.id, customerData: formData },
      {
        onSuccess: () => {
          handleCancel();
        },
      }
    );
  };

  return (
    <>
      <Button
        size="middle"
        type="primary"
        title="Edit customer"
        onClick={showModal}
      >
        <EditFilled />
      </Button>
      <Modal
        title="Update Customer"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            name: customer.name || "",
            email: customer.email || "",
            phone: customer.phone || "",
            location: customer.location || "",
            note: customer.note || "",
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
            rules={[{ required: true, message: "Phone number is required" }]}
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
            <Input.TextArea placeholder="Enter additional notes" allowClear />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isPending} block>
            Update Customer
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCustomer;
