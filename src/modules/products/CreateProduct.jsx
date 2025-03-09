import { Button, Form, Input, Modal, InputNumber, Row, Col, Upload } from "antd";
import { useState } from "react";
import { useCreateProductHook } from "./hooks/useCreateProductHook";
import { UploadOutlined } from "@ant-design/icons";

const CreateProduct = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate: addNewProduct, isPending } = useCreateProductHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (formData) => {
    addNewProduct(formData, {
      onSuccess: () => {
        handleCancel();
      },
    });
  };

  return (
    <>
      <Button type="primary" className="add-btn" onClick={showModal}>
        Add Product
      </Button>
      <Modal
        title="Create New Product"
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
            description: "",
            price: null,
            stock: null,
            image: null,
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Enter name" allowClear />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input.TextArea placeholder="Enter description" allowClear rows={3} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Upload Image"
            rules={[{ required: true, message: "Image is required" }]}
          >
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Price is required" }]}
              >
                <InputNumber placeholder="Enter price" style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="stock"
                label="Stock"
                rules={[{ required: true, message: "Stock is required" }]}
              >
                <InputNumber placeholder="Enter stock" style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" loading={isPending} block>
            Add Product
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CreateProduct;
