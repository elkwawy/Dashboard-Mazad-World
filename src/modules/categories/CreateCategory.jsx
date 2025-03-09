import { Button, Form, Input, Modal, Upload } from "antd";
import { useState } from "react";
import { useCreateCategoryHook } from "./hooks/useCreateCategoryHook";
import { UploadOutlined } from "@ant-design/icons";

const CreateCategory = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate: addNewCategory, isPending } = useCreateCategoryHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (formData) => {
    const formattedData = new FormData();
    formattedData.append("name", formData.name);
    if (formData.photo && formData.photo[0]) {
      formattedData.append("photo", formData.photo[0].originFileObj);
    }

    addNewCategory(formattedData, {
      onSuccess: () => {
        // handleCancel();
      },
    });
  };

  const normFile = (e) => {
    return e?.fileList || [];
  };

  return (
    <>
      <Button type="primary" className="add-btn" onClick={showModal}>
        Add Category
      </Button>
      <Modal
        title="Create New Category"
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
            photo: [],
          }}
        >
          {/* Name Field */}
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Enter name" allowClear />
          </Form.Item>

          {/* Photo Upload Field */}
          <Form.Item
            name="photo"
            label="Photo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Photo is required" }]}
          >
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={() => false} 
            >
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isPending} block>
            Add New Category
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CreateCategory;
