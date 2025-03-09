import { DeleteFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Typography } from "antd";
import { useDeleteUserHook } from "./hooks/useDeleteUserHook";
import { useState } from "react";
const { Text } = Typography;

const DeleteUser = ({ user }) => {
  const deleteUserMutation = useDeleteUserHook();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleDelete = () => {
    deleteUserMutation.mutate(user.id, {
      onSuccess: () => setIsModalVisible(false), // إغلاق المودال بعد الحذف
    });
  };

  return (
    <>
      <Button
        danger
        title="Delete user"
        onClick={showModal}
        loading={deleteUserMutation.isPending}
      >
        <DeleteFilled />
      </Button>

      <Modal
        title={
          <div>
            <ExclamationCircleOutlined
              style={{ color: "#faad14", marginRight: 8 }}
            />
            Are you sure you want to delete this user?
          </div>
        }
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        confirmLoading={deleteUserMutation.isPending}
        okText="Yes, Delete"
        okType="danger"
        cancelText="Cancel"
      >
        <Text>
          User <Text strong>{user.name}</Text>? will be permanently deleted.
        </Text>
      </Modal>
    </>
  );
};

export default DeleteUser;
