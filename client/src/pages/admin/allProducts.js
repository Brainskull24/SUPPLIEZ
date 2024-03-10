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
      <div className="product-container flex flex-col items-center ">
        <h1 className="text-center m-4">PRODUCTS AVAILABLE</h1>
        <div className="product-box">
          {products?.map((p) => (
            <Link
              key={p._id}
              to={`/dashboard/admin/product/${p.slug}`}
              className="product-link"
            >
              <div className="card m-2" style={{ width: "18rem" }}>
                <Link to={`/dashboard/admin/product/${p.slug}`}>
                  <div className="card-body">
                    <img
                      src={`http://localhost:9002/api/v1/product/productphoto/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <h5 className="card-title">NAME: {p.name}</h5>
                    <h5 className="card-title">SELLER: {p.sellername}</h5>
                    <h5 className="card-title">PRICE: RS. {p.price}</h5>
                  </div>
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
