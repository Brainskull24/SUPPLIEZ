import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Home/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import registerImage from "../imgs/register.jpg"
import toast from "react-hot-toast";
const HomePage = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:9002/api/v1/category/allcategory");
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
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:9002/api/v1/product/productlist/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:9002/api/v1/product/productcount");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:9002/api/v1/product/productlist/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
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

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:9002/api/v1/product/productfilters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  const divStyle = {
    backgroundImage: `url(${registerImage})`,
    backgroundSize: "cover",
    minHeight: "100vh",
  };
  return (
    <main style={divStyle}>
    <Layout>
        <div className="col-m-auto">
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-1" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`http://localhost:9002/api/v1/product/productphoto/${p._id}`}
                  style={{ width: "18rem" , height: "13rem"}}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text"> $ {p.Price}</p>
                  <button
                    className="btn btn-primary m-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
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
                  <i class="fa-solid fa-bag-shopping fa-xl"></i>
                  </button>
                  <button
                    className="btn btn-primary m-1"
                  >
                  <i class="fa-regular fa-heart fa-xl"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-1 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
    </Layout>
    </main>
  );
};

export default HomePage;
