import React, { useState } from "react";
import Layout from "../../components/Layout/Home/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../../styles/register.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [Contact, setContact] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:9002/api/v1/auth/forgot-password",
        {
          email,
          password,
          Contact,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="register">
        <h3>Change Password</h3>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
        ></input>
        <input
          type="password"
          name="New Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter your New Password"
        ></input>
        <input
          type="Number"
          name="Contact"
          value={Contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Enter your Contact"
        ></input>
        <div className="buttons">
          <button className="button" onClick={handleSubmit}>
            RESET
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
