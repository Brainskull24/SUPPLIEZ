import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Home/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/card.css";
const HomePage = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9002/api/v1/category/allcategory"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:9002/api/v1/product/productlist/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9002/api/v1/product/productcount"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:9002/api/v1/product/productlist/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:9002/api/v1/product/productfilters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="product-box">
        <div className="product-container">
          {products?.map((p) => (
            <div
              className="product-item card"
              key={p._id}
              onClick={() => navigate(`/product/${p.slug}`)}
            >
              <img
                src={`http://localhost:9002/api/v1/product/productphoto/${p._id}`}
                style={{ width: "18rem", height: "13rem" }}
                className="card-img-top"
                alt={p.name}
                onError={(e) => {
                  console.error("Error loading image. URL:", e.target.src);
                }}
                onLoad={() => {
                  console.log("Image loaded successfully");
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">
                  RS: {p.price} / {p.unit}
                </p>
                <div className="item-btn">
                  <button
                    className="btn btn-primary m-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    <i className="fa-solid fa-bag-shopping fa-xl"></i>
                  </button>
                  <button className="btn btn-primary m-1">
                    <i className="fa-regular fa-heart fa-xl"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pro-box">
          {products && products.length < total && (
            <button
              className="item-btn btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading ..." : "View All"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
