import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { useUpdateLatestNewsHook } from "./hooks/useUpdateLatestNewsHook";
import { EditFilled } from "@ant-design/icons";

const { Option } = Select;

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
    updateNews(
      { newsId: news.id, newsData: formData },
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
            Update News
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateLatestNews;
