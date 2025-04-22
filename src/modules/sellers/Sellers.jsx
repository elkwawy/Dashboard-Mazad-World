import { Table, Space, Spin, Input, Badge, Empty } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import CreateSeller from "./CreateSeller";
import UpdateSeller from "./UpdateSeller";
import DeleteSeller from "./DeleteSeller";
import { useGetSellersHook } from "./hooks/useGetSellersHook";

const Sellers = () => {
  const { sellers, isLoading, isFetching, error } = useGetSellersHook();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSellers = sellers.filter((seller) =>
    seller.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const isActive = status === 1;
        return (
          <Badge
            color={isActive ? "green" : "red"}
            text={isActive ? "Active" : "Inactive"}
          />
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
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
        <div className="flex justify-center items-center h-[50vh]">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={filteredSellers}
          pagination={{ pageSize: 5 }}
          scroll={{ x: true }}
          loading={isFetching}
          locale={{
            emptyText: (
              <Empty
                description="No sellers found"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ),
          }}
        />
      )}
    </section>
  );
};

export default Sellers;
