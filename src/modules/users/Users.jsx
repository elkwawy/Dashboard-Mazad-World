import { Table, Space, Spin, Input } from "antd";
import CreateUser from "./CreateUser";
import { useGetAllUsersHook } from "./hooks/useGetAllUsersHook";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

function Users() {
  const { users, isLoading, isFetching, error } = useGetAllUsersHook();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <UpdateUser user={record} />
          <DeleteUser user={record} />
        </Space>
      ),
    },
  ];

  console.log(users);

  return (
    <section className="-mt-[17px]">
      <h1 className="text-2xl font-bold">Users</h1>
      <div className="search-add-container">
        <Input
          prefix={<SearchOutlined className="text-gray-400 mr-2" />}
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
          className="search-input"
        />

        <CreateUser />
      </div>

      {error && <p className="text-red-500">Error: {error.message}</p>}

      {isLoading ? (
        <div className="flex justify-center items-center h-[55vh]">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredUsers.map((user) => ({ ...user, key: user.id }))}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 600 }}
          className="overflow-auto"
          loading={isFetching}
        />
      )}
    </section>
  );
}

export default Users;
