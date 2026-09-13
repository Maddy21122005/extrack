import { Button, Form, Input, message } from "antd";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    try {
      await api.post("/api/v1/user/signup", values, {
        withCredentials: true,
      });

      message.success("Signup Successful");

      navigate("/login");
    } catch (error) {
      message.error(error.response?.data?.message || "Signup failed");
    }
  };


  return (
    <>
      <div className="signup-page">
        <div className="signup-card">
          <Form
            className="signup-form"
            layout="vertical"
            onFinish={submitHandler}
            requiredMark={false} // hides the red star
          >
            <h2 className="signup-title">Create your account</h2>
            <p className="signup-subtitle">
              Join Extrack and take control of your money
            </p>

            <Form.Item
              label="Full name"
              name="fullName"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Your full name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input placeholder="you@example.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please create a password" }]}
            >
              <Input.Password placeholder="Create a password" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="signup-btn"
              block
            >
              Sign up
            </Button>

            <div className="signup-footer">
              <span className="muted-text">Already have an account?</span>{" "}
              <Link to="/login" className="login-link">
                Log in
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
