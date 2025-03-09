import { DeleteFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Typography } from "antd";
import { useDeleteProductHook } from "./hooks/useDeleteProductHook";
import { useState } from "react";
const { Text } = Typography;

const DeleteProduct = ({ product }) => {
  const deleteProductMutation = useDeleteProductHook();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleDelete = () => {
    deleteProductMutation.mutate(product.id, {
      onSuccess: () => setIsModalVisible(false),
    });
  };

  return (
    <>
      <Button danger title="Delete Product" onClick={showModal} loading={deleteProductMutation.isPending}>
        <DeleteFilled />
      </Button>

      <Modal
        title={
          <div>
            <ExclamationCircleOutlined style={{ color: "#faad14", marginRight: 8 }} />
            Are you sure you want to delete this product?
          </div>
        }
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        confirmLoading={deleteProductMutation.isPending}
        okText="Yes, Delete"
        okType="danger"
        cancelText="Cancel"
      >
        <Text>
          Product named <Text strong>{product.name}</Text> will be permanently deleted.
        </Text>
      </Modal>
    </>
  );
};

export default DeleteProduct;