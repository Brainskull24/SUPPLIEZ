import { React, useState } from "react";
import "../styles/contact.css";
import Layout from "./Layout/Home/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ContactImage from "../imgs/register.jpg";
export default function Contact() {
  const history = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    query: "",
  });

  const handleContact = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const registerContact = () => {
    const { name, email, query } = userInfo;
    if (name && email && query) {
      axios
        .post("http://localhost:9002/api/v1/query/queries", userInfo)
        .then((res) => {
          alert(res.data.message);
          history("/");
        });
    } else {
      alert("invalid input");
    }
  };
  const divStyle = {
    backgroundImage: `url(${ContactImage})`,
    backgroundSize: "cover",
    minHeight: "100vh",
  };
  return (
    <main style={divStyle}>
      <Layout></Layout>
      <div className="wrapper">
        <div className="flex wrapperc rounded-md bg-[rgba(20,20,23,0.788)]">
        <h3 className="text-center">Contact Us</h3>
          <div className="flex flex-col">
            <label className="flex mb-1">NAME</label>
            <input
              type="text"
              className="register-input"
              name="name"
              value={userInfo.name}
              onChange={handleContact}
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col">
            <label className="flex mb-1">EMAIL</label>
            <input
              type="email"
              className="register-input"
              name="email"
              value={userInfo.email}
              onChange={handleContact}
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col">
            <label className="flex mb-1">QUERY</label>
            <textarea
              className="register-input"
              name="query"
              value={userInfo.query}
              onChange={handleContact}
              placeholder="Enter your query"
            />
          </div>
          <div className="register-buttons">
            <button
              type="submit"
              className="register-button"
              onClick={registerContact}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
