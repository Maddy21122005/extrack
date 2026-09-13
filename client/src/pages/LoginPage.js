import { Button, Form, Input, message } from "antd";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    try {
      await api.post("/api/v1/user/login", values);

      message.success("Login Successful");
      navigate("/");
    } catch (error) {
      message.error("Invalid Email or Password");
    }

    //prevent for login user
  };

  return (
    <>
      <div className="login-page">
        <div className="login-card">
          <Form
            className="login-form"
            layout="vertical"
            onFinish={submitHandler}
            requiredMark={false}
          >
            <h2 className="login-title">Welcome back </h2>
            <p className="login-subtitle">
              Let’s get you back to tracking your finances
            </p>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input placeholder="Enter your email" type="email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="login-btn"
              block
            >
              Login
            </Button>

            <div className="login-footer">
              <span className="muted-text">New to Extrack?</span>
              <Link to="/signup" className="signup-link">
                Create an account
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
