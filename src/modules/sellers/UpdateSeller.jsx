import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { useUpdateSellerHook } from "./hooks/useUpdateSellerHook";
import { EditFilled } from "@ant-design/icons";

const { Option } = Select;

const UpdateSeller = ({ seller }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate: updateSeller, isPending } = useUpdateSellerHook();

  const showModal = () => {
    setIsModalVisible(true);
    form.setFieldsValue({
      name: seller.name || "",
      status: seller.status ?? null,
      startcount: seller.startcount || "",
      countReviews: seller.countReviews || "",
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (formData) => {
    updateSeller(
      { sellerId: seller.id, sellerData: formData },
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
        title="Edit seller"
        onClick={showModal}
      >
        <EditFilled />
      </Button>
      <Modal
        title="Update Seller"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
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

          <Form.Item
            name="startcount"
            label="Start Count"
          >
            <Input placeholder="Enter start count" allowClear />
          </Form.Item>

          <Form.Item
            name="countReviews"
            label="Count Reviews"
          >
            <Input placeholder="Enter count reviews" allowClear />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isPending} block>
            Update Seller
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateSeller;
