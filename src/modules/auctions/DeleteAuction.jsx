import { DeleteFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Typography } from "antd";
import { useDeleteAuctionHook } from "./hooks/useDeleteAuctionHook";
import { useState } from "react";
const { Text } = Typography;

const DeleteAuction = ({ auction }) => {
  const deleteAuctionMutation = useDeleteAuctionHook();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleDelete = () => {
    deleteAuctionMutation.mutate(auction.id, {
      onSuccess: () => setIsModalVisible(false),
    });
  };

  return (
    <>
      <Button danger title="Delete Auction" onClick={showModal} loading={deleteAuctionMutation.isPending}>
        <DeleteFilled />
      </Button>

      <Modal
        title={
          <div>
            <ExclamationCircleOutlined style={{ color: "#faad14", marginRight: 8 }} />
            Are you sure you want to delete this auction?
          </div>
        }
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        confirmLoading={deleteAuctionMutation.isPending}
        okText="Yes, Delete"
        okType="danger"
        cancelText="Cancel"
      >
        <Text>
          Auction titled <Text strong>{auction.title}</Text> will be permanently deleted.
        </Text>
      </Modal>
    </>
  );
};

export default DeleteAuction;