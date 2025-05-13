import { Button, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useMarkAsReadContactUS } from "./hooks/useMarkAsReadContactUS";

const MarkAsReadContactUS = ({ contact }) => {
  const { mutate: markAsRead, isPending } = useMarkAsReadContactUS();

  const handleMarkAsRead = () => {
    markAsRead(contact.id);
  };

  return (
    <Tooltip title={+contact.is_read ? "" : "Mark as read"}>
      <Button
        type="default"
        size="middle"
        icon={<EyeOutlined />}
        onClick={handleMarkAsRead}
        loading={isPending}
        disabled={+contact.is_read}
      />
    </Tooltip>
  );
};

export default MarkAsReadContactUS;
