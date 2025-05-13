import { DeleteFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Typography } from "antd";
import { useDeleteBidHook } from "./hooks/useDeleteBidHook";
import { useState } from "react";
const { Text } = Typography;

const DeleteBid = ({ bid }) => {
  const deleteBidMutation = useDeleteBidHook();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleDelete = () => {
    deleteBidMutation.mutate(bid.id, {
      onSuccess: () => setIsModalVisible(false),
    });
  };

  return (
    <>
      <Button
        danger
        title="Delete Bid"
        onClick={showModal}
        loading={deleteBidMutation.isPending}
      >
        <DeleteFilled />
      </Button>

      <Modal
        title={
          <div>
            <ExclamationCircleOutlined
              style={{ color: "#faad14", marginRight: 8 }}
            />
            Are you sure you want to delete this bid?
          </div>
        }
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        confirmLoading={deleteBidMutation.isPending}
        okText="Yes, Delete"
        okType="danger"
        cancelText="Cancel"
      >
        <Text>
          Bid from <Text strong>{bid.name}</Text> on auction{" "}
          <Text strong>{bid.product_title}</Text> will be permanently deleted.
        </Text>
      </Modal>
    </>
  );
};

export default DeleteBid;
