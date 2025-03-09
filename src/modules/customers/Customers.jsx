import { useState } from "react";
import { Table, Space, Spin, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useGetCustomersHook } from "./hooks/useGetCustomersHook";
import CreateCustomer from "./CreateCustomer";
import UpdateCustomer from "./UpdateCustomer";
import DeleteCustomer from "./DeleteCustomer";

function Customers() {
  const { customers, isLoading, isFetching, error } = useGetCustomersHook();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <UpdateCustomer customer={record} />
          <DeleteCustomer customer={record} />
        </Space>
      ),
    },
  ];

  return (
    <section className="-mt-[17px]">
      <h1 className="text-2xl font-bold">Customers</h1>
      <div className="search-add-container">
        <Input
          prefix={<SearchOutlined className="text-gray-400 mr-2" />}
          placeholder="Search by name, phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
          className="search-input"
        />

        <CreateCustomer />
      </div>

      {error && <p className="text-red-500">Error: {error.message}</p>}

      {isLoading ? (
        <div className="flex justify-center items-center h-[55vh]">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredCustomers}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 800 }}
          className="overflow-auto"
          loading={isFetching}
        />
      )}
    </section>
  );
}

export default Customers;
