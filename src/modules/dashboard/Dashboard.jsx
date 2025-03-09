import { Row, Col, Card, Statistic } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';

function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <Row gutter={16}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={1234}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={456}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Revenue"
              value={9876}
              prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Products"
              value={89}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;