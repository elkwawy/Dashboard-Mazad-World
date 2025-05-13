import { Table, Space, Spin, Input, Image, Select, Tag } from "antd";
import { useState } from "react";
import { useGetContactUSHook } from "./hooks/useGetContactUSHook";
import DeleteContactUS from "./DeleteContactUS";
import { SearchOutlined } from "@ant-design/icons";
import MarkAsReadContactUS from "./MarkAsReadContactUS";

function ContactUS() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const isReadMap = {
    all: undefined,
    read: 1,
    unread: 0,
  };

  const { contactUS, isLoading, isFetching, error } = useGetContactUSHook(
    isReadMap[filterValue]
  );

  const filteredContactUS = contactUS.filter((contact) =>
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
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
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
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
          <MarkAsReadContactUS contact={record} />
          <DeleteContactUS contact={record} />
        </Space>
      ),
    },
  ];

  return (
    <section className="-mt-[17px]">
      <h1 className="text-2xl font-bold mb-4">Contact US</h1>

      <div className="search-add-container flex gap-4 mb-4">
        <Input
          prefix={<SearchOutlined className="text-gray-400 mr-2" />}
          placeholder="Search by email..."
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
          dataSource={filteredContactUS}
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

export default ContactUS;
