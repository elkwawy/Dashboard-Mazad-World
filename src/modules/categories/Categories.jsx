import { Table, Space, Spin, Input, Image } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useGetCategoriesHook } from "./hooks/useGetCategoriesHook";
import CreateCategory from "./CreateCategory";
import UpdateCategory from "./UpdateCategory";
import DeleteCategory from "./DeleteCategory";

function Categories() {
  const { categories, isLoading, isFetching, error } = useGetCategoriesHook();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => <Image src={photo} alt="img" className="object-cover" width={50} height={50} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <UpdateCategory category={record} />
          <DeleteCategory category={record} />
        </Space>
      ),
    },
  ];

  return (
    <section className="-mt-[17px]">
      <h1 className="text-2xl font-bold">Categories</h1>
      <div className="search-add-container">
        <Input
          prefix={<SearchOutlined className="text-gray-400 mr-2" />}
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
          className="search-input"
        />

        <CreateCategory />
      </div>

      {error && <p className="text-red-500">Error: {error.message}</p>}

      {isLoading ? (
        <div className="flex justify-center items-center h-[55vh]">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredCategories.map((category) => ({
            ...category,
            key: category.id,
          }))}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 600 }}
          className="overflow-auto"
          loading={isFetching}
        />
      )}
    </section>
  );
}

export default Categories;
