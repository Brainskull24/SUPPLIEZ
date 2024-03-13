import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Admin/Layout";
import axios from "axios";
import "../../styles/card.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9002/api/v1/product/getproduct"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="product-box" >
        <div className="product-container">
          {products?.map((p) => (
            <div
              className="product-item card"
              key={p._id}
            >
              <img
                src={`http://localhost:9002/api/v1/product/productphoto/${p._id}`}
                style={{ width: "18rem", height: "13rem" }}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">
                  RS: {p.price} / {p.unit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
