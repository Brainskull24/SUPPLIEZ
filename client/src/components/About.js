import React from "react";
import "../styles/components.css";
import Layout from "./Layout/Home/Layout";
const Homepage = () => {
  return (
    <Layout>
      <div className="about-page">
        <div className="welcome-note">
          <h2>WELCOME TO SUPPLIEZ - YOUR OWN GROCERY STORE</h2>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
