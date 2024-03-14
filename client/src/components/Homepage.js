import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Home/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import c1 from "../imgs/c1.jpg"
import c2 from "../imgs/c2.jpg"
import c3 from "../imgs/c3.jpg"
import "../styles/card.css";
import feedimg from "../imgs/feedback.jpg";
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


  /* FEEDBACK FORM */
  const [query, setQuery] = useState({
    name: "",
    email: "",
    feedbacktext: "",
  });
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
  /* FEEDBACK FORM */


  //GET ALL CATEGORIES
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
    getAllProducts();
  }, []);
  //GET ALL CATEGORIES


  //GET ALL PRODUCTS
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
  //GET ALL PRODUCTS 


  // TOTAL COUNT
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
  //TOTAL COUNT


  //LOAD MORE
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
  //LOAD MORE 


  // FILTER PRODUCTS
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
  // FILTER PRODUCTS 


  return (
    <Layout >
      <div
          id="carouselExampleControls"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src = {c1}
                alt="First slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src={c2}
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src={c3}
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
      <div className="product-box" >
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
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">
                  RS: {p.price} / {p.unit}
                </p>
                <div className="item-btn">
                  <button
                    className="btn btn-primary "
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
                  <button className="btn btn-primary">
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
              className="hey-button"
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
    </Layout>
  );
};

export default HomePage;
