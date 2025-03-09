import { Table, Space, Spin, Input } from "antd";
import CreateSeller from "./CreateSeller";
import { useGetSellersHook } from "./hooks/useGetSellersHook";
import UpdateSeller from "./UpdateSeller";
import DeleteSeller from "./DeleteSeller";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

function Sellers() {
  const { sellers, isLoading, isFetching, error } = useGetSellersHook();
  const [searchQuery, setSearchQuery] = useState("");
  console.log(sellers);
  

  const filteredSellers = sellers.filter(
    (seller) =>
      seller.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Start Count",
      dataIndex: "startcount",
      key: "startcount",
    },
    {
      title: "Count Reviews",
      dataIndex: "countReviews",
      key: "countReviews",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <UpdateSeller seller={record} />
          <DeleteSeller seller={record} />
        </Space>
      ),
    },
  ];

  return (
    <section className="-mt-[17px]">
      <h1 className="text-2xl font-bold">Sellers</h1>
      <div className="search-add-container">
        <Input
          prefix={<SearchOutlined className="text-gray-400 mr-2" />}
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
          className="search-input"
        />

        <CreateSeller />
      </div>

      {error && <p className="text-red-500">Error: {error.message}</p>}

      {isLoading ? (
        <div className="flex justify-center items-center h-[55vh]">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredSellers}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 600 }}
          className="overflow-auto"
          loading={isFetching}
        />
      )}
    </section>
  );
}

export default Sellers;