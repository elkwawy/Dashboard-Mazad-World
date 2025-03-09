import { DeleteFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Typography } from "antd";
import { useDeleteCustomerHook } from "./hooks/useDeleteCustomerHook";
import { useState } from "react";
const { Text } = Typography;

const DeleteCustomer = ({ customer }) => {
  const deleteCustomerMutation = useDeleteCustomerHook();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleDelete = () => {
    deleteCustomerMutation.mutate(customer.id, {
      onSuccess: () => setIsModalVisible(false), 
    });
  };

  return (
    <>
      <Button
        danger
        title="Delete customer"
        onClick={showModal}
        loading={deleteCustomerMutation.isPending}
      >
        <DeleteFilled />
      </Button>

      <Modal
        title={
          <div>
            <ExclamationCircleOutlined
              style={{ color: "#faad14", marginRight: 8 }}
            />
            Are you sure you want to delete this customer?
          </div>
        }
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        confirmLoading={deleteCustomerMutation.isPending}
        okText="Yes, Delete"
        okType="danger"
        cancelText="Cancel"
      >
        <Text>
          Customer <Text strong>{customer.name}</Text> will be permanently
          deleted.
        </Text>
      </Modal>
    </>
  );
};

export default DeleteCustomer;
