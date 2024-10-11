import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Home/Layout"

const Register = () => {
  const navigate = useNavigate();
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
    const { name, email, password, reEnterPassword, age, Contact } = user;
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
          navigate("/login");
        });
    } else {
      alert("invalid input");
    }
  };

  return (
    <Layout>
      <div className="register">
        <h3>Create Account</h3>
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
        <div className="register-buttons">
          <div className="hey-button" onClick={register}>
            REGISTER
          </div>
          <div className="hey-button" onClick={() => navigate("/login")}>
            LOGIN
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
