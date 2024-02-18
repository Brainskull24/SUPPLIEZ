import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Admin/Layout";
import toast from "react-hot-toast";
import axios from "axios";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [sellername, setSellerName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [photo, setPhoto] = useState("");

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
  const handleCreate = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    productData.append("name", name);
    productData.append("sellername", sellername);
    productData.append("price", price);
    productData.append("quantity", quantity);
    productData.append("photo", photo);
    productData.append("category", category);
    productData.append("unit", unit);

    axios
      .post("http://localhost:9002/api/v1/product/createproduct", productData)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <Layout>
        <div className="w-3/5 m-4">
          <h1 className="">CREATE PRODUCT</h1>
          <div className="mb-3">
            <select
              placeholder="select category"
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
          </div>
          <div className="mb-3">
            <label className="btn btn-outline-secondary col-md-12">
              {photo ? photo.name : "UPLOAD PHOTO"}
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
            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  height={"200px"}
                  className="img img-responsive"
                />
              </div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              value={name}
              placeholder="PRODUCT NAME"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="sellername"
              value={sellername}
              placeholder="SELLER'S NAME"
              className="form-control"
              onChange={(e) => setSellerName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              name="price"
              type="number"
              value={price}
              placeholder="PRICE"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              name="quantity"
              value={quantity}
              placeholder="QUANTITY"
              className="form-control"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <select
              name="unit"
              placeholder="UNIT"
              showSearch
              className="form-select mb-3"
              value={unit}
              onChange={(e) => {
                setUnit(e.target.value);
              }}
            >
              <option value="kgs">KGS</option>
              <option value="kuntuls">KUNTULS</option>
            </select>
          </div>
          <div className="mb-3">
            <button className="btn btn-primary" onClick={handleCreate}>
              CREATE PRODUCT
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProduct;
