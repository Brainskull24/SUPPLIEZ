import React from "react";
import {NavLink } from "react-router-dom";
import useCategory from "../components/hooks/useCategory";
import Layout from "../components/Layout/Home/Layout";
const Categories = () => {
  const categories = useCategory();
  return (
      <Layout>
        <div className="m-4 flex justify-between">
            {categories.map((c) => (
              <button className="w-[20px]" key={c._id}>
                <NavLink
                  to={`/category/${c.slug}`}
                  className="text-black no-underline"
                >
                  {c.name}
                </NavLink>
              </button>
            ))}
          </div>
      </Layout>
  );
};

export default Categories;
