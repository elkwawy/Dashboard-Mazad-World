import { Table, Space, Spin, Input, Image, Select, Tag } from "antd";
import { useState } from "react";
import { useGetBidsHook } from "./hooks/useGetBidsHook";
import DeleteBid from "./DeleteBid";
import { SearchOutlined } from "@ant-design/icons";
import MarkAsReadBid from "./MarkAsReadBid";

function Bids() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const isReadMap = {
    all: undefined,
    read: 1,
    unread: 0,
  };

  const { bids, isLoading, isFetching, error } = useGetBidsHook(
    isReadMap[filterValue]
  );

  const filteredBids = bids.filter((auction) =>
    auction.payment_method.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: "Product Img",
      dataIndex: "product_image_url",
      key: "product_image_url",
      render: (images) =>
        images ? (
          <Image width={50} src={images} alt="Auction Img" />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Product Title",
      dataIndex: "product_title",
      key: "product_title",
      width: 250,
    },
    {
      title: "Start Price",
      dataIndex: "product_price",
      key: "product_price",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Bid Value",
      dataIndex: "bid_value",
      key: "bid_value",
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "Status",
      dataIndex: "is_read",
      key: "is_read",
      render: (isRead) => (
        <Tag color={+isRead ? "green" : "volcano"}>
          {+isRead ? "Read" : "Unread"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <MarkAsReadBid bid={record} />
          <DeleteBid bid={record} />
        </Space>
      ),
    },
  ];

  return (
    <section className="-mt-[17px]">
      <h1 className="text-2xl font-bold mb-4">Bids</h1>

      <div className="search-add-container flex gap-4 mb-4">
        <Input
          prefix={<SearchOutlined className="text-gray-400 mr-2" />}
          placeholder="Search by payment method..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
          className="search-input w-[250px]"
        />

        <Select
          value={filterValue}
          onChange={(value) => setFilterValue(value)}
          options={[
            { label: "All", value: "all" },
            { label: "Read", value: "read" },
            { label: "Unread", value: "unread" },
          ]}
          className="w-[180px]"
        />
      </div>

      {error && <p className="text-red-500">Error: {error.message}</p>}

      {isLoading ? (
        <div className="flex justify-center items-center h-[55vh]">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredBids}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
          className="overflow-auto"
          loading={isFetching}
          rowKey="id"
        />
      )}
    </section>
  );
}

export default Bids;
