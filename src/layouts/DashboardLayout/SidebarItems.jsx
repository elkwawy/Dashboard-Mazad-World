import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { FaNewspaper, FaShoppingBag, FaUsers } from "react-icons/fa";
import { RiAuctionLine, RiTeamFill } from "react-icons/ri";
import { FaQuestion } from "react-icons/fa";
const SidebarItems = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname.split("/")[2];

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "users",
      icon: <FaUsers />,
      label: "Users",
    },
    {
      key: "customers",
      icon: <TeamOutlined />,
      label: "Customers",
    },
    {
      key: "sellers",
      icon: <RiTeamFill />,
      label: "Sellers",
    },
    {
      key: "faqs",
      icon: <FaQuestion />,
      label: "FAQs",
    },
    {
      key: "auctions",
      icon: <RiAuctionLine />,
      label: "Auctions",
    },
    {
      key: "latestNews",
      icon: <FaNewspaper />,
      label: "Latest News",
    },
    {
      key: "categories",
      icon: <AppstoreOutlined />,
      label: "Categories",
    },
    {
      key: "products",
      icon: <FaShoppingBag />,
      label: "Products",
    },
  ];
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[path]}
      items={menuItems}
      onClick={({ key }) => navigate(key)}
    />
  );
};

export default SidebarItems;
