import { Button, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useMarkAsReadBid } from "./hooks/useMarkAsReadBid";

const MarkAsReadBid = ({ bid }) => {
  const { mutate: markAsRead, isPending } = useMarkAsReadBid();

  const handleMarkAsRead = () => {
    markAsRead(bid.id);
  };

  return (
    <Tooltip title={`${+bid.is_read ? "" : "Mark asread"}`}>
      <Button
        type="default"
        size="middle"
        icon={<EyeOutlined />}
        onClick={handleMarkAsRead}
        loading={isPending}
        disabled={+bid.is_read} // تمنع التكرار
      />
    </Tooltip>
  );
};

export default MarkAsReadBid;
