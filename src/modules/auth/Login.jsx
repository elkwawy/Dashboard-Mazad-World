import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import useAuthHook from "./useAuthHook";
import { Spin } from "antd";
function Login() {
  const { handleLogin, loading, contextHolder } = useAuthHook();

  const onFinish = (values) => {
    handleLogin(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8">
          Mazed World Dashboard
        </h1>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              size="large"
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="password"
            validateTrigger="onChange"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 8,
                message: "Password must be at least 8 characters!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
              allowClear
            />
          </Form.Item>
          <Form.Item>
            {loading ? (
              <div className="flex justify-center">
                <Spin />
              </div>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
              >
                Log in
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
