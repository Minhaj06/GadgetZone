import React from "react";
import { Button, Divider } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";

const SocialLogin = () => {
  return (
    <div>
      <Divider
        style={{
          borderColor: "var(--lightColor)",
          borderWidth: "2px",
        }}
      >
        OR
      </Divider>

      <div>
        <Button
          className="d-flex justify-content-center align-items-center w-100 mb-4"
          size="large"
        >
          <GoogleOutlined style={{ color: "#0F9D58" }} />
          <span>Login With Google</span>
        </Button>

        <Button
          className="d-flex justify-content-center align-items-center w-100"
          size="large"
        >
          <FacebookOutlined style={{ color: "#4267B2" }} />
          <span>Login With Facebook</span>
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;
