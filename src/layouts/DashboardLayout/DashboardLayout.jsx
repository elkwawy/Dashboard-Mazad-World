import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import SidebarItems from "./SidebarItems";
import UserMenu from "./UserMenu";

const { Header, Sider, Content } = Layout;

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const SidebarToggleIcon = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;
  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
      >
        <div className="text-white h-8 m-4 ml-2 text-center text-xl font-bold">
          ELkwawy
        </div>
        <SidebarItems />
      </Sider>
      <Layout>
        <Header className="bg-white px-4 flex justify-between items-center shadow-sm">
          <SidebarToggleIcon
            className="text-xl p-4 cursor-pointer transition-colors hover:text-blue-500"
            onClick={() => setCollapsed(!collapsed)}
          />
          <UserMenu />
        </Header>
        <Content className="m-6 p-6 bg-white">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
