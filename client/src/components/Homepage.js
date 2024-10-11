import { useState, useEffect } from "react";
import Layout from "./../components/Layout/Home/Layout";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import c1 from "../imgs/c1.jpg";
import c2 from "../imgs/c2.jpg";
import c3 from "../imgs/c3.jpg";
import "../styles/card.css";

const HomePage = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [,setCategories] = useState([]);
  const [checked] = useState([]);
  const [radio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
  });

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
  });

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

  // FILTER PRODUCTS
  // const handleFilter = (value, id) => {
  //   let all = [...checked];
  //   if (value) {
  //     all.push(id);
  //   } else {
  //     all = all.filter((c) => c !== id);
  //   }
  //   setChecked(all);
  // };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    // eslint-disable-next-line 
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    // eslint-disable-next-line 
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

  return (
    <Layout>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={c1} alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={c2} alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={c3} alt="Third slide" />
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
    </Layout>
  );
};

export default HomePage;
