import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { useCreateSellerHook } from "./hooks/useCreateSellerHook";

const { Option } = Select;

const CreateSeller = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate: addNewSeller, isPending } = useCreateSellerHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (formData) => {
    console.log(formData); // هنا هتشوف status جاية كـ 1 أو 0

    addNewSeller(formData, {
      onSuccess: () => {
        handleCancel();
      },
    });
  };

  return (
    <>
      <Button type="primary" className="add-btn" onClick={showModal}>
        Add Seller
      </Button>
      <Modal
        title="Create New Seller"
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
            status: null,
            startcount: "",
            countReviews: "",
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
            name="status"
            label="Status"
            rules={[{ required: true, message: "Status is required" }]}
          >
            <Select placeholder="Select status" allowClear>
              <Option value={1}>Active</Option>
              <Option value={0}>Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item name="startcount" label="Start Count">
            <Input placeholder="Enter start count" allowClear />
          </Form.Item>

          <Form.Item name="countReviews" label="Count Reviews">
            <Input placeholder="Enter count reviews" allowClear />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isPending} block>
            Add New Seller
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CreateSeller;
