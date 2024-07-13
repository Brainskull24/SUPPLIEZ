import React from "react";
import "../styles/components.css";
import Layout from "./Layout/Home/Layout";
import feedimg from "../imgs/feedback.jpg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const [query, setQuery] = useState({
    name: "",
    email: "",
    feedbacktext: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery({
      ...query,
      [name]: value,
    });
  };
  const Feedback = () => {
    const { name, email, feedbacktext } = query;
    if (name && email && feedbacktext) {
      axios
        .post("http://localhost:9002/api/v1/query/feedback", query)
        .then((res) => {
          alert(res.data.message);
          navigate("/");
        });
    } else {
      alert("Please fill all the details");
    }
  };
  return (
    <Layout>
      <div className="about-page">
        <div className="welcome-note">
          <h2>WELCOME TO SUPPLIEZ - YOUR OWN GROCERY STORE</h2>
        </div>
        <div className="feedback-form">
        <div className="left-col">
          <img src={feedimg} alt="loading" />
        </div>
        <div className="right-col">
          <h1>Your Feedback Matters</h1>
          <form onSubmit={Feedback} className="feed-form">
            <input
              type="text"
              name="name"
              id="name"
              value={query.name}
              onChange={handleChange}
              placeholder="ENTER YOUR NAME : "
            />
            <input
              type="email"
              name="email"
              id="email"
              value={query.email}
              onChange={handleChange}
              placeholder="ENTER YOUR EMAIL :"
            />
            <textarea
              name="feedbacktext"
              id="feedbacktext"
              cols="30"
              rows="10"
              value={query.feedbacktext}
              onChange={handleChange}
              placeholder="LEAVE A FEEDBACK !"
            ></textarea>
            <button className="feed-btn" type="Submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Homepage;
