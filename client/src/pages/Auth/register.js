import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Layout/Home/Navbar";
import registerImage from "../../imgs/register.jpg";
const Register = () => {
  const history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
    age: "",
    Contact: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, password, reEnterPassword, age, Contact} =
      user;
    if (
      name &&
      email &&
      password &&
      password === reEnterPassword &&
      age &&
      Contact
    ) {
      axios
        .post("http://localhost:9002/api/v1/auth/register", user)
        .then((res) => {
          alert(res.data.message);
          history("/login");
        });
    } else {
      alert("invlid input");
    }
  };
  const divStyle = {
    backgroundImage: `url(${registerImage})`,
    backgroundSize: "cover",
    minHeight: "100vh",
  };
  return (
    <main style={divStyle}>
      <Navbar></Navbar>
        <div className="register">
          <h3 className="text-white">Create Account</h3>
          <input
            type="text"
            name="name"
            value={user.name}
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            type="Number"
            name="age"
            value={user.age}
            placeholder="Age"
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            value={user.email}
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={handleChange}
          />
          <input
            type="password"
            name="reEnterPassword"
            value={user.reEnterPassword}
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          <input
            type="Number"
            name="Contact"
            value={user.Contact}
            placeholder="Contact"
            onChange={handleChange}
          />
          <div className="buttons">
            <div className="button" onClick={register}>
              REGISTER
            </div>
            <div className="button" onClick={() => history("/login")}>
              LOGIN
            </div>
          </div>
        </div>
    </main>
  );
};

export default Register;
