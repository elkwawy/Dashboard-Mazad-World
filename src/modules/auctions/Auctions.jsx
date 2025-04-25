import { Table, Space, Spin, Input, Image } from "antd";
import CreateAuction from "./CreateAuction";
import { useGetAuctionsHook } from "./hooks/useGetAuctionsHook";
import UpdateAuction from "./UpdateAuction";
import DeleteAuction from "./DeleteAuction";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useGetCategoriesHook } from "../categories/hooks/useGetCategoriesHook";

function Auctions() {
  const { auctions, isLoading, isFetching, error } = useGetAuctionsHook();
  const [searchQuery, setSearchQuery] = useState("");
  const filteredAuctions = auctions.filter((auction) =>
    auction.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(auctions);

  const {
    categories,
    isLoading: categoriesIsLoading,
    error: categoriesError,
  } = useGetCategoriesHook();

  console.log(auctions);

  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) =>
        images ? (
          <Image width={50} src={images[0]} alt="Auction Img" />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category_id",
      key: "category",
      render: (categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.name : "Unknown Category";
      },
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    // },
    // {
    //   title: "Starting Price",
    //   dataIndex: "starting_price",
    //   key: "starting_price",
    // },
    {
      title: "Current Price",
      dataIndex: "current_price",
      key: "current_price",
    },
    // {
    //   title: "Start Time",
    //   dataIndex: "start_time",
    //   key: "start_time",
    // },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <UpdateAuction auction={record} />
          <DeleteAuction auction={record} />
        </Space>
      ),
    },
  ];

  return (
    <section className="-mt-[17px]">
      <h1 className="text-2xl font-bold">Auctions</h1>
      <div className="search-add-container">
        <Input
          prefix={<SearchOutlined className="text-gray-400 mr-2" />}
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
          className="search-input"
        />

        <CreateAuction />
      </div>

      {error && <p className="text-red-500">Error: {error.message}</p>}

      {isLoading || categoriesIsLoading ? (
        <div className="flex justify-center items-center h-[55vh]">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredAuctions}
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

export default Auctions;
