import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Layout from "../../components/Layout/Home/Navbar";
import registerImage from "../../imgs/register.jpg";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios
      .post("http://localhost:9002/api/v1/auth/login", user)
      .then((res) => {
        alert(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
          isAuthenticated: true,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const divStyle = {
    backgroundImage: `url(${registerImage})`,
    backgroundSize: "cover",
    minHeight: "100vh",
  };

  return (
    <main style={divStyle}>
      <Layout></Layout>
      <div className="flex register m-auto w-3/10 rounded-md mt-2 text-center p-4 bg-[rgba(20,20,23,0.788)]">
        <h3>Login Now</h3>
        <input
          className="register-input"
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter your Email"
        ></input>
        <input
          className="register-input"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter your Password"
        ></input>
        <span
          className="cursor-pointer"
          onClick={() => {
            navigate("/forgot-password");
          }}
        >
          Forgot Password ?
        </span>
        <div className="register-buttons">
          <div className="register-button" onClick={login}>
            LOGIN
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
