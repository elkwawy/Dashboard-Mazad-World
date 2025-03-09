import { DeleteFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Typography } from "antd";
import { useDeleteSellerHook } from "./hooks/useDeleteSellerHook";
import { useState } from "react";
const { Text } = Typography;

const DeleteSeller = ({ seller }) => {
  const deleteSellerMutation = useDeleteSellerHook();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleDelete = () => {
    deleteSellerMutation.mutate(seller.id, {
      onSuccess: () => setIsModalVisible(false), // إغلاق المودال بعد الحذف
    });
  };

  return (
    <>
      <Button
        danger
        title="Delete seller"
        onClick={showModal}
        loading={deleteSellerMutation.isPending}
      >
        <DeleteFilled />
      </Button>

      <Modal
        title={
          <div>
            <ExclamationCircleOutlined
              style={{ color: "#faad14", marginRight: 8 }}
            />
            Are you sure you want to delete this seller?
          </div>
        }
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        confirmLoading={deleteSellerMutation.isPending}
        okText="Yes, Delete"
        okType="danger"
        cancelText="Cancel"
      >
        <Text>
          Seller <Text strong>{seller.name}</Text> will be permanently deleted.
        </Text>
      </Modal>
    </>
  );
};

export default DeleteSeller;
