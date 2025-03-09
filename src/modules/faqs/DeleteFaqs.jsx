import { DeleteFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Typography } from "antd";
import { useDeleteFaqsHook } from "./hooks/useDeleteFaqsHook";
import { useState } from "react";
const { Text } = Typography;

const DeleteFaq = ({ faq }) => {
  const deleteFaqMutation = useDeleteFaqsHook();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleDelete = () => {
    deleteFaqMutation.mutate(faq.id, {
      onSuccess: () => setIsModalVisible(false), // إغلاق المودال بعد الحذف
    });
  };

  return (
    <>
      <Button
        danger
        title="Delete FAQ"
        onClick={showModal}
        loading={deleteFaqMutation.isPending}
      >
        <DeleteFilled />
      </Button>

      <Modal
        title={
          <div>
            <ExclamationCircleOutlined
              style={{ color: "#faad14", marginRight: 8 }}
            />
            Are you sure you want to delete this FAQ?
          </div>
        }
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        confirmLoading={deleteFaqMutation.isPending}
        okText="Yes, Delete"
        okType="danger"
        cancelText="Cancel"
      >
        <Text>
          FAQ titled <Text strong>{faq.question}</Text> will be permanently
          deleted.
        </Text>
      </Modal>
    </>
  );
};

export default DeleteFaq;