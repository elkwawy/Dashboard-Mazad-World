import { Table, Space, Spin, Input, Image } from "antd";
import CreateProduct from "./CreateProduct";
import { useGetProductsHook } from "./hooks/useGetProductsHook";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

function Products() {
  const { products, isLoading, isFetching, error } = useGetProductsHook();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imageUrl) =>
        imageUrl ? (
          <Image width={50} src={imageUrl} alt="Product Img" />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <UpdateProduct product={record} />
          <DeleteProduct product={record} />
        </Space>
      ),
    },
  ];

  return (
    <section className="-mt-[17px]">
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="search-add-container">
        <Input
          prefix={<SearchOutlined className="text-gray-400 mr-2" />}
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
          className="search-input"
        />

        <CreateProduct />
      </div>

      {error && <p className="text-red-500">Error: {error.message}</p>}

      {isLoading ? (
        <div className="flex justify-center items-center h-[55vh]">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredProducts.map((product, index) => ({
            ...product,
            key: index,
          }))}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 800 }}
          className="overflow-auto"
          loading={isFetching}
          rowKey="name"
        />
      )}
    </section>
  );
}

export default Products;