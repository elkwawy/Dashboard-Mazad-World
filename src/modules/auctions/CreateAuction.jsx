import { Button, Form, Input, Modal, DatePicker, InputNumber, Row, Col } from "antd";
import { useState } from "react";
import { useCreateAuctionHook } from "./hooks/useCreateAuctionHook";
import dayjs from "dayjs";

const CreateAuction = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate: addNewAuction, isPending } = useCreateAuctionHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (formData) => {
    const formattedData = {
      ...formData,
      start_time: formData.start_time ? dayjs(formData.start_time).format("YYYY-MM-DD HH:mm:ss") : null,
      end_time: formData.end_time ? dayjs(formData.end_time).format("YYYY-MM-DD HH:mm:ss") : null,
    };


    addNewAuction(formattedData, {
      onSuccess: () => {
        handleCancel();
      },
    });
  };

  return (
    <>
      <Button type="primary" className="add-btn" onClick={showModal}>
        Add Auction
      </Button>
      <Modal
        title="Create New Auction"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        style={{ top: 20 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            title: "",
            description: "",
            image: "",
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
            <Input.TextArea
              placeholder="Enter description"
              allowClear
              rows={3}
            />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: "Image URL is required" }]}
          >
            <Input placeholder="Enter image URL" allowClear />
          </Form.Item>

          {/* Prices: Starting Price and Current Price */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="starting_price"
                label="Starting Price"
                rules={[{ required: true, message: "Starting Price is required" }]}
              >
                <InputNumber
                  placeholder="Enter starting price"
                  style={{ width: "100%" }}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="current_price"
                label="Current Price"
                rules={[{ required: true, message: "Current Price is required" }]}
              >
                <InputNumber
                  placeholder="Enter current price"
                  style={{ width: "100%" }}
                  min={0}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Times: Start Time and End Time */}
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

          {/* Category ID and User ID */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category_id"
                label="Category ID"
                rules={[{ required: true, message: "Category ID is required" }]}
              >
                <InputNumber
                  placeholder="Enter category ID"
                  style={{ width: "100%" }}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="user_id"
                label="User ID"
                rules={[{ required: true, message: "User ID is required" }]}
              >
                <InputNumber
                  placeholder="Enter user ID"
                  style={{ width: "100%" }}
                  min={0}
                />
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

export default CreateAuction;