import { Button, Form, Input, Modal, InputNumber, Row, Col } from "antd";
import { useState } from "react";
import { useUpdateProductHook } from "./hooks/useUpdateProductHook";
import { EditFilled } from "@ant-design/icons";

const UpdateProduct = ({ product }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate: updateProduct, isPending } = useUpdateProductHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (formData) => {
    updateProduct(
      { productId: product.id, productData: formData },
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
        title="Edit Product"
        onClick={showModal}
      >
        <EditFilled />
      </Button>
      <Modal
        title="Update Product"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            name: product.name || "",
            description: product.description || "",
            price: product.price || "",
            stock: product.stock || "",
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
            <Input.TextArea
              placeholder="Enter description"
              allowClear
              rows={3}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Price is required" }]}
              >
                <InputNumber
                  placeholder="Enter price"
                  style={{ width: "100%" }}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="stock"
                label="Stock"
                rules={[{ required: true, message: "Stock is required" }]}
              >
                <InputNumber
                  placeholder="Enter stock"
                  style={{ width: "100%" }}
                  min={0}
                />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" loading={isPending} block>
            Update Product
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateProduct;
