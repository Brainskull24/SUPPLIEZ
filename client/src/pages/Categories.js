import React from "react";
import { NavLink } from "react-router-dom";
import useCategory from "../components/hooks/useCategory";
import Layout from "../components/Layout/Home/Layout";
import "../styles/pages.css";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout>
      <div className="categories">
        <h1 className="categories-head">CATEGORIES AVAILABLE</h1>
        <div className="categories-box">
          {categories.map((c) => (
            <button className="categories-btn" key={c._id}>
              <NavLink to={`/category/${c.slug}`} className="btn-link">
                {c.name}
              </NavLink>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
