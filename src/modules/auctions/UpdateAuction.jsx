import {
  Button,
  Form,
  Input,
  Modal,
  DatePicker,
  InputNumber,
  Row,
  Col,
  Upload,
  Select,
} from "antd";
import { useState } from "react";
import { useUpdateAuctionHook } from "./hooks/useUpdateAuctionHook";
import { EditFilled, UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useGetCategoriesHook } from "../categories/hooks/useGetCategoriesHook";

const UpdateAuction = ({ auction }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const { mutate: updateAuction, isPending } = useUpdateAuctionHook();
  const {  categories, isLoading: isCategoriesLoading } = useGetCategoriesHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (formData) => {
    const formattedData = new FormData();
    formattedData.append("title", formData.title);
    formattedData.append("description", formData.description);
    formattedData.append("starting_price", formData.starting_price);
    formattedData.append("current_price", formData.current_price);
    formattedData.append("paymentLink", formData.paymentLink);
    formattedData.append(
      "start_time",
      formData.start_time ? dayjs(formData.start_time).format("YYYY-MM-DD HH:mm:ss") : null
    );
    formattedData.append(
      "end_time",
      formData.end_time ? dayjs(formData.end_time).format("YYYY-MM-DD HH:mm:ss") : null
    );
    formattedData.append("category_id", formData.category_id);

    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((file, index) => {
        if (file.originFileObj) {
          formattedData.append(`images[${index}]`, file.originFileObj);
        }
      });
    }

    updateAuction(
      { auctionId: auction.id, auctionData: formattedData },
      {
        onSuccess: () => {
          handleCancel();
        },
      }
    );
  };

  return (
    <>
      <Button size="middle" type="primary" title="Edit Auction" onClick={showModal}>
        <EditFilled />
      </Button>
      <Modal
        title="Update Auction"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        style={{ top: 20 }}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            title: auction.title || "",
            description: auction.description || "",
            starting_price: auction.starting_price || null,
            current_price: auction.current_price || null,
            start_time: auction.start_time ? dayjs(auction.start_time) : null,
            end_time: auction.end_time ? dayjs(auction.end_time) : null,
            category_id: auction.category_id || null,
            paymentLink: auction.paymentLink || null,
            images: auction.images
              ? auction.images.map((img, index) => ({
                  uid: `${index}`,
                  name: `image-${index}`,
                  status: "done",
                  url: img,
                }))
              : [],
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

          <Form.Item
            name="category_id"
            label="Category"
            rules={[{ required: true, message: "Category is required" }]}
          >
            <Select
              placeholder="Select a category"
              loading={isCategoriesLoading}
              allowClear
              showSearch
              optionFilterProp="label"
            >
              {categories?.map((cat) => (
                <Select.Option key={cat.id} value={cat.id} label={cat.name}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="paymentLink"
            label="Payment Link"
            rules={[{ required: true, message: "Payment Link is required" }]}
          >
            <Input placeholder="Enter payment link" allowClear />
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

          <Form.Item
            name="images"
            label="Upload Images"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList || []}
            rules={[{ required: true, message: "Please upload at least one image" }]}
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              multiple
              defaultFileList={[]}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
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
