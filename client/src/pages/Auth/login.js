import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Layout from "../../components/Layout/Home/Layout";

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
        console.log(auth)
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="register">
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
          <div className="hey-button" onClick={login}>
            LOGIN
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
