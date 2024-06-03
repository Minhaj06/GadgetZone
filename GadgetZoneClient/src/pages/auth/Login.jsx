import React, { useState } from "react";
import { Form, Input, Button, Divider } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const [email, setEmail] = useState(""); // minhaj@gmail.com
  const [password, setPassword] = useState(""); // 123456

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post(`/login`, values);

      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Login successful");

        navigate(location.state || `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Login failed. Try again.");
    }
  };

  return (
    <section style={{ margin: "7rem 0" }}>
      <div className="container">
        <div className="row g-0 justify-content-center">
          <div className="col-lg-6 col-xl-5">
            <div className="bgLight2 border rounded-5 p-5 shadow-sm">
              <h2 className="text-center display-5 mb-5">Login</h2>
              <Form name="login" initialValues={{ email, password }} onFinish={handleSubmit}>
                <Form.Item
                  label={<span className="fs-4">Email</span>}
                  name="email"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: "Please input your Email!" }]}
                >
                  <Input
                    size="large"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="fs-4">Password</span>}
                  name="password"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: "Please input your Password!" }]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button type="primary" htmlType="submit" size="large" block>
                    Login Now
                  </Button>
                </Form.Item>
              </Form>

              <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <p>
                  Don't have an account?{" "}
                  <Link className="themeColor" to="/register">
                    Register now
                  </Link>
                </p>
              </div>

              <Divider
                className="py-4"
                style={{
                  borderColor: "var(--lightColor)",
                  borderWidth: "2px",
                }}
              >
                OR
              </Divider>

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
        </div>
      </div>
    </section>
  );
};

export default Login;
