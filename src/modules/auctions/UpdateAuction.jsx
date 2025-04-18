import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Upload } from "antd";
import { useState } from "react";
import { useUpdateAuctionHook } from "./hooks/useUpdateAuctionHook";
import { EditFilled, UploadOutlined } from "@ant-design/icons";

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
            title: "",
            description: "",
            images: [],
            starting_price: null,
            current_price: null,
            start_time: null,
            end_time: null,
            category_id: null,
            user_id: null,
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

          {/* مكون رفع الصور */}
          <Form.Item
            name="images"
            label="Upload Images"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList || []}
            rules={[{ required: true, message: "Please upload at least one image" }]}
          >
            <Upload
              listType="picture-card"
              maxCount={4} 
              beforeUpload={() => false} 
              multiple
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="starting_price"
                label="Starting Price"
                rules={[{ required: true, message: "Starting Price is required" }]}
              >
                <InputNumber placeholder="Enter starting price" style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="current_price"
                label="Current Price"
                rules={[{ required: true, message: "Current Price is required" }]}
              >
                <InputNumber placeholder="Enter current price" style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="start_time"
                label="Start Time"
                rules={[{ required: true, message: "Start Time is required" }]}
              >
                <DatePicker showTime style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="end_time"
                label="End Time"
                rules={[{ required: true, message: "End Time is required" }]}
              >
                <DatePicker showTime style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category_id"
                label="Category ID"
                rules={[{ required: true, message: "Category ID is required" }]}
              >
                <InputNumber placeholder="Enter category ID" style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="user_id"
                label="User ID"
                rules={[{ required: true, message: "User ID is required" }]}
              >
                <InputNumber placeholder="Enter user ID" style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" loading={isPending} block>
            Add Auction
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateAuction;