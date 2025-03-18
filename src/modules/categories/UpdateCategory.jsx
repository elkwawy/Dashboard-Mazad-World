import { Button, Form, Input, Modal, Upload } from "antd";
import { useState, useEffect } from "react";
import { useUpdateCategoryHook } from "./hooks/useUpdateCategoryHook";
import { EditFilled, UploadOutlined } from "@ant-design/icons";

const UpdateCategory = ({ category }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate: updateCategory, isPending } = useUpdateCategoryHook();

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
        photo: category.photo
          ? [{ uid: "-1", name: "Current Photo", url: category.photo }]
          : [],
      });
    }
  }, [category, form]);

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

    if (
      formData.photo &&
      formData.photo.length > 0 &&
      formData.photo[0].originFileObj
    ) {
      formattedData.append("photo", formData.photo[0].originFileObj);
    }

    updateCategory(
      { categoryId: category.id, categoryData: formattedData },
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
        title="Edit category"
        onClick={showModal}
      >
        <EditFilled />
      </Button>

      <Modal
        title="Update Category"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
            getValueFromEvent={(e) => e?.fileList || []}
            rules={[{ required: true, message: "Photo is required" }]}
          >
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
              defaultFileList={form.getFieldValue("photo")}
            >
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isPending} block>
            Update Category
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCategory;
