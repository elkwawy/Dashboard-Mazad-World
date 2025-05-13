import { DeleteFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Typography } from "antd";
import { useDeleteContactUSHook } from "./hooks/useDeleteContactUSHook";
import { useState } from "react";
const { Text } = Typography;

const DeleteContactUS = ({ contact }) => {
  const deleteMutation = useDeleteContactUSHook();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleDelete = () => {
    deleteMutation.mutate(contact.id, {
      onSuccess: () => setIsModalVisible(false),
    });
  };

  return (
    <>
      <Button
        danger
        title="Delete Contact"
        onClick={showModal}
        loading={deleteMutation.isPending}
      >
        <DeleteFilled />
      </Button>

      <Modal
        title={
          <div>
            <ExclamationCircleOutlined style={{ color: "#faad14", marginRight: 8 }} />
            Are you sure you want to delete this message?
          </div>
        }
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        confirmLoading={deleteMutation.isPending}
        okText="Yes, Delete"
        okType="danger"
        cancelText="Cancel"
      >
        <Text>
          Message from <Text strong>{contact.name}</Text> with email{" "}
          <Text strong>{contact.email}</Text> will be permanently deleted.
        </Text>
      </Modal>
    </>
  );
};

export default DeleteContactUS;
