import { Button, Form, Input, Modal, DatePicker } from "antd";
import { useState } from "react";
import { useUpdateLatestNewsHook } from "./hooks/useUpdateLatestNewsHook";
import { EditFilled } from "@ant-design/icons";
import dayjs from "dayjs";

const UpdateLatestNews = ({ news }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate: updateNews, isPending } = useUpdateLatestNewsHook();

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
      date: formData.date ? dayjs(formData.date).format("YYYY-MM-DD") : null,
    };

    updateNews(
      { newsId: news.id, newsData: formattedData },
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
        title="Edit News"
        onClick={showModal}
      >
        <EditFilled />
      </Button>
      <Modal
        title="Update News"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            title: news.title || "",
            description: news.description || "",
            image: news.image || "",
            date: news.date ? dayjs(news.date) : null,
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

          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Date is required" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isPending} block>
            Update News
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateLatestNews;
