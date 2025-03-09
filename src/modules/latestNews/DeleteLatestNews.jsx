import { DeleteFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Typography } from "antd";
import { useDeleteLatestNewsHook } from "./hooks/useDeleteLatestNewsHook";
import { useState } from "react";
const { Text } = Typography;

const DeleteNews = ({ news }) => {
  const deleteNewsMutation = useDeleteLatestNewsHook();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleDelete = () => {
    deleteNewsMutation.mutate(news.id, {
      onSuccess: () => setIsModalVisible(false), // إغلاق المودال بعد الحذف
    });
  };

  return (
    <>
      <Button
        danger
        title="Delete News"
        onClick={showModal}
        loading={deleteNewsMutation.isPending}
      >
        <DeleteFilled />
      </Button>

      <Modal
        title={
          <div>
            <ExclamationCircleOutlined
              style={{ color: "#faad14", marginRight: 8 }}
            />
            Are you sure you want to delete this news?
          </div>
        }
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        confirmLoading={deleteNewsMutation.isPending}
        okText="Yes, Delete"
        okType="danger"
        cancelText="Cancel"
      >
        <Text>
          News titled <Text strong>{news.title}</Text> will be permanently deleted.
        </Text>
      </Modal>
    </>
  );
};

export default DeleteNews;
