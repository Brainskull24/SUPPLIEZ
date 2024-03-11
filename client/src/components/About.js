import React from "react";
import "../styles/components.css";
import feedimg from "../imgs/feedback.jpg";
import Layout from "./Layout/Home/Layout";
import axios from "axios";
import { useState } from "react";
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
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="https://th.bing.com/th/id/R.ef69695af22709fdd92931d837c2d839?rik=lhRrFBP1pZb%2fMw&riu=http%3a%2f%2fnasheman.in%2fwp-content%2fuploads%2f2018%2f04%2fformers.jpg&ehk=42IouDtyq2tmsJMs5a%2f2i5MTR34Ql0dLQkpI%2bhKfstQ%3d&risl=&pid=ImgRaw&r=0"
                alt="First slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://penntoday.upenn.edu/sites/default/files/spotlight/field3.jpg"
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://th.bing.com/th/id/R.0d975595d8b7caef3be975b90276f718?rik=dk3GFEnaKOkOTA&pid=ImgRaw&r=0"
                alt="Third slide"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
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