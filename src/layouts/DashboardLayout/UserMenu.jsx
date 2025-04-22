import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { useState } from "react";
import useAuthHook from "@/modules/auth/useAuthHook";
const UserMenu = () => {
  const { user, handleLogout } = useAuthHook();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userMenuItems = [
    {
      key: "profile",
      label: (
        <div className="py-2 px-1">
          <div className="font-semibold">{user?.user.name}</div>
          <div className="text-gray-500 text-sm">{user?.user.email}</div>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      danger: true,
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown
      menu={{ items: userMenuItems }}
      trigger={["click"]}
      placement="bottomRight"
      open={dropdownOpen} // Dropdown التحكم في فتح/إغلاق الـ
      onOpenChange={(open) => setDropdownOpen(open)} // Dropdown تحديث حالة الـ
    >
      <div className="cursor-pointer">
        <Avatar size="large" icon={<UserOutlined />} className="bg-blue-500" />
      </div>
    </Dropdown>
  );
};

export default UserMenu;
