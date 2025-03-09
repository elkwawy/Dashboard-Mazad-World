import { Table, Space, Spin, Input, Tag, Image } from "antd";
import CreateFaqs from "./CreateFaqs";
import { useGetFaqsHook } from "./hooks/useGetFaqsHook";
import UpdateFaqs from "./UpdateFaqs";
import DeleteFaqs from "./DeleteFaqs";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

function Faqs() {
  const { faqs, isLoading, isFetching, error } = useGetFaqsHook();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(filteredFaqs);
  

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <UpdateFaqs faq={record} />
          <DeleteFaqs faq={record} />
        </Space>
      ),
    },
  ];

  return (
    <section className="-mt-[17px]">
      <h1 className="text-2xl font-bold">FAQs</h1>
      <div className="search-add-container">
        <Input
          prefix={<SearchOutlined className="text-gray-400 mr-2" />}
          placeholder="Search by question..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
          className="search-input"
        />

        <CreateFaqs />
      </div>

      {error && <p className="text-red-500">Error: {error.message}</p>}

      {isLoading ? (
        <div className="flex justify-center items-center h-[55vh]">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredFaqs.map((faq, index) => ({
            ...faq,
            key: index,
          }))}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 800 }}
          className="overflow-auto"
          loading={isFetching}
          rowKey="question"
        />
      )}
    </section>
  );
}

export default Faqs;
