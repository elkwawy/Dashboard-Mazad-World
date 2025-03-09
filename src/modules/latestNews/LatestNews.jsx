import { Table, Space, Spin, Input, Tag, Image } from "antd";
import CreateLatestNews from "./CreateLatestNews";
import { useGetLatestNewsHook } from "./hooks/useGetLatestNewsHook";
import UpdateLatestNews from "./UpdateLatestNews";
import DeleteLatestNews from "./DeleteLatestNews";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

function LatestNews() {
  const { latestNews, isLoading, isFetching, error } = useGetLatestNewsHook();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = latestNews.filter((news) =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imageUrl) =>
        imageUrl ? (
          <Image width={50} src={imageUrl} alt="News Image" />
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
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <UpdateLatestNews news={record} />
          <DeleteLatestNews news={record} />
        </Space>
      ),
    },
  ];

  return (
    <section className="-mt-[17px]">
      <h1 className="text-2xl font-bold">Latest News</h1>
      <div className="search-add-container">
        <Input
          prefix={<SearchOutlined className="text-gray-400 mr-2" />}
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
          className="search-input"
        />

        <CreateLatestNews />
      </div>

      {error && <p className="text-red-500">Error: {error.message}</p>}

      {isLoading ? (
        <div className="flex justify-center items-center h-[55vh]">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredNews.map((news, index) => ({
            ...news,
            key: index,
            date: news.date.slice(0, 10),
          }))}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 800 }}
          className="overflow-auto"
          loading={isFetching}
          rowKey="title"
        />
      )}
    </section>
  );
}

export default LatestNews;
