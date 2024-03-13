import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Home/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/productdetails.css";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:9002/api/v1/product/getproduct/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

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

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http:localhost:9002/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-2 ">
        <div className="col-md-6">
          <img
            src={`http://localhost:9002/api/v1/product/productphoto/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 ">
          <h3 className="text-center">PRODUCT DETAILS</h3>
          <h6>NAME : {product.name}</h6>
          <h6>PRICE : RS. {product.price}</h6>
          <h6>CATEGORY : {product?.category?.name}</h6>
          {products?.map((p) => (
            <div className="d-flex">
              <button
                className="btn btn-primary m-1"
                onClick={() => {
                  setCart([...cart, p]);
                  localStorage.setItem("cart", JSON.stringify([...cart, p]));
                  toast.success("Item Added to cart");
                }}
              >
                ADD TO CART
                <i class="fa-solid fa-bag-shopping fa-xl"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>SIMILAR PRODUCTS</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`http://localhost:9002/api/v1/product/productphoto/${p?._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text"> $ {p.Price}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button
                  className="btn btn-primary m-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item Added to cart");
                  }}
                >
                  <i class="fa-solid fa-bag-shopping fa-xl"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
