import { Button, Form, Input, Modal, Spin } from "antd";
import { useState } from "react";
import { useUpdateSellerHook } from "./hooks/useUpdateSellerHook";
import { EditFilled } from "@ant-design/icons";

const UpdateSeller = ({ seller }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate: updateSeller, isPending } = useUpdateSellerHook();

  const showModal = () => {
    setIsModalVisible(true);
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
          initialValues={{
            name: seller.name || "",
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Enter name" allowClear />
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
