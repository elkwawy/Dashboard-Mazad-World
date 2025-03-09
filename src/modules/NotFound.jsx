import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { path } from "@/constant/paths";
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          onClick={() => navigate(`/${path.main}/dashboard`)}
          type="primary"
        >
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
