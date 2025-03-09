import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useUpdateAuctionHook } from "./hooks/useUpdateAuctionHook";
import { EditFilled } from "@ant-design/icons";

const UpdateAuction = ({ auction }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate: updateAuction, isPending } = useUpdateAuctionHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (formData) => {
    updateAuction(
      { auctionId: auction.id, auctionData: formData },
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
        title="Edit Auction"
        onClick={showModal}
      >
        <EditFilled />
      </Button>
      <Modal
        title="Update Auction"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            title: auction.title || "",
            description: auction.description || "",
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="Enter title" allowClear />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input.TextArea placeholder="Enter description" allowClear rows={3} />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isPending} block>
            Update Auction
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateAuction;