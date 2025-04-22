import { Row, Col, Card, Statistic, Table, Image, Spin } from "antd";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons";
import { ImHammer2 } from "react-icons/im";
import { FaQuestion } from "react-icons/fa";
import { useGetAuctionsHook } from "../auctions/hooks/useGetAuctionsHook";
import { useGetAllUsersHook } from "../users/hooks/useGetAllUsersHook";
import { useGetFaqsHook } from "../faqs/hooks/useGetFaqsHook";
import { useGetCategoriesHook } from "../categories/hooks/useGetCategoriesHook";

function Dashboard() {
  const columnsAuctions = [
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
      title: "Current Price",
      dataIndex: "current_price",
      key: "current_price",
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
    },
  ];
  const { auctions, isLoading, isFetching } = useGetAuctionsHook();
  const { users, isLoading: isLoadingUsers } = useGetAllUsersHook();
  const { faqs, isLoading: isLoadingFaqs } = useGetFaqsHook();
  const { categories, isLoading: isLoadingCategories } = useGetCategoriesHook();
  return (
    <div className="">
      <h1 className="text-2xl font-bold -mt-0 mb-5">Dashboard</h1>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={users.length}
              prefix={<UserOutlined />}
              loading={isLoadingUsers}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Auctions"
              value={auctions.length}
              prefix={<ImHammer2 className="rotate-90" />}
              loading={isLoading || isFetching}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="FAQs"
              value={faqs.length}
              prefix={<FaQuestion className="text-[22px]" />}
              loading={isLoadingFaqs}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Categories"
              value={categories.length}
              prefix={<AppstoreOutlined />}
              loading={isLoadingCategories}
            />
          </Card>
        </Col>
      </Row>
      {/* Latest Auctions Table */}
      <Card title="Latest Auctions" className="mt-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-[44vh]">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columnsAuctions}
            dataSource={auctions.slice(0, 5)}
            pagination={false}
            loading={isFetching}
          />
        )}
      </Card>
    </div>
  );
}

export default Dashboard;
