import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Admin/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:9002/api/v1/product/getproduct");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
      <div className="col-md-1 "></div>
        <div className="col-md-9 ">
          <h1 className="text-center">PRODUCTS AVAILIABLE</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
              key={p._id}
              to={`/dashboard/admin/product/${p.slug}`}
              className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:9002/api/v1/product/productphoto/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    />
                  <div className="card-body">
                    <h5 className="card-title">NAME: {p.name}</h5>
                    <h5 className="card-title">SELLER: {p.sname}</h5>
                    <h5 className="card-title">PRICE: {p.Price}</h5>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
