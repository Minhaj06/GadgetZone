import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import SocialLogin from "../../components/socialLogin/SocialLogin";

const Register = () => {
  // states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // hooks
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post(`/register`, values);
      console.log(data);

      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Registration successful");

        navigate(location.state || "/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration failed. Try again.");
    }
  };

  return (
    <section style={{ margin: "7rem 0" }}>
      <div className="container">
        <div className="row g-0 justify-content-center">
          <div className="col-lg-6 col-xl-5">
            <div className="bgLight2 border rounded-5 p-5 shadow-sm">
              <h2 className="text-center display-5 mb-5">Registration</h2>

              <Form
                name="login"
                initialValues={{ firstName, lastName, email, password }}
                onFinish={handleSubmit}
              >
                <Form.Item
                  label={<span className="fs-4">First Name</span>}
                  name="firstName"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: "Please input your First Name!" }]}
                >
                  <Input
                    size="large"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="fs-4">Last Name</span>}
                  name="lastName"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: "Please input your Last Name!" }]}
                >
                  <Input
                    size="large"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Item>

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
                    Register Now
                  </Button>
                </Form.Item>
              </Form>

              <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <p>
                  Already have an account?{" "}
                  <Link className="themeColor" to="/login">
                    Login Now
                  </Link>
                </p>
              </div>

              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
