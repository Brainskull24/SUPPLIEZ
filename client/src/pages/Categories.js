import React from "react";
import {NavLink } from "react-router-dom";
import useCategory from "../components/hooks/useCategory";
import Layout from "../components/Layout/Home/Layout";
import registerImage from "../imgs/register.jpg"
const Categories = () => {
  const categories = useCategory();
  const divStyle = {
    backgroundImage: `url(${registerImage})`,
    backgroundSize: "cover",
    minHeight: "100vh",
  };
  return (
    <main style={divStyle}>
      <Layout>
        <div className="m-4 flex justify-between">
            {categories.map((c) => (
              <button className="w-fit bg-[rgba(20,20,23,0.788)]" key={c._id}>
                <NavLink
                  to={`/category/${c.slug}`}
                  className="text-white no-underline"
                >
                  {c.name}
                </NavLink>
              </button>
            ))}
          </div>
      </Layout>
    </main>
  );
};

export default Categories;
