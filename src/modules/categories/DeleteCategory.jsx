import { DeleteFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Typography } from "antd";
import { useDeleteCategoryHook } from "./hooks/useDeleteCategoryHook";
import { useState } from "react";
const { Text } = Typography;

const DeleteCategory = ({ category }) => {
  const deleteCategoryMutation = useDeleteCategoryHook();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleDelete = () => {
    deleteCategoryMutation.mutate(category.id, {
      onSuccess: () => setIsModalVisible(false), // إغلاق المودال بعد الحذف
    });
  };

  return (
    <>
      <Button
        danger
        title="Delete category"
        onClick={showModal}
        loading={deleteCategoryMutation.isPending}
      >
        <DeleteFilled />
      </Button>

      <Modal
        title={
          <div>
            <ExclamationCircleOutlined
              style={{ color: "#faad14", marginRight: 8 }}
            />
            Are you sure you want to delete this category?
          </div>
        }
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        confirmLoading={deleteCategoryMutation.isPending}
        okText="Yes, Delete"
        okType="danger"
        cancelText="Cancel"
      >
        <Text>
          Category <Text strong>{category.name}</Text>? will be permanently deleted.
        </Text>
      </Modal>
    </>
  );
};

export default DeleteCategory;
