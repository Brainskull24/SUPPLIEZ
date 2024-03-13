import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Admin/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [sellername, setSellerName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:9002/api/v1/product/getproduct/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setSellerName(data.product.sellername);
      setPrice(data.product.price);
      setPhoto(data.product.photo);
      setQuantity(data.product.quantity);
      setUnit(data.product.unit);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
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
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("sellername", sellername);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("unit", unit);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `http://localhost:9002/api/v1/product/updateproduct/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  //delete a product
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:9002/api/v1/product/deleteproduct/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="col-md-9">
          <h1>Update Product</h1>
          <div className="m-1 w-75">
            <select
              value={category}
              placeholder="Select a category"
              className="form-select mb-3"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`http://localhost:9002/api/v1/product/productphoto/${id}`}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>

            <div className="mb-3">
              <input
                name="name"
                type="text"
                value={name}
                placeholder="write a name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="sellername"
                value={sellername}
                placeholder="Seller Name"
                className="form-control"
                onChange={(e) => setSellerName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                name="price"
                type="number"
                value={price}
                placeholder="write a Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                name="quantity"
                type="number"
                value={quantity}
                placeholder="write a quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <select
                name="unit"
                value={unit}
                placeholder="Select Unit"
                className="form-select mb-3"
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
              >
                <option value="kgs">KGS</option>
                <option value="kuntuls">KUNTULS</option>
              </select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleUpdate}>
                UPDATE PRODUCT
              </button>
            </div>
            <div className="mb-3">
              <button className="btn btn-danger" onClick={handleDelete}>
                DELETE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
