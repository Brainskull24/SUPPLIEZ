import express from "express";
import formidable from "express-formidable";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
  productCountController,
  productFiltersController,
  productListController,
  realtedProductController,
  searchProductController,
  productCategoryController,
  brainTreePaymentController,
  braintreeTokenController,
} from "../controllers/productController.js";

import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// create product
router.post(
  "/createproduct",
  // requireSignIn,
  // isAdmin,
  formidable(),
  createProductController
);

// update product
router.put(
  "/updateproduct/:id",
  // requireSignIn,
  // isAdmin,
  formidable(),
  updateProductController
);

// get products
router.get("/getproduct", getProductController);

// get single product
router.get("/getproduct/:slug", getSingleProductController);

// get product photo 
router.get("/productphoto/:pid", productPhotoController);

// delete product
router.delete("/deleteproduct/:id", deleteProductController);

// filter products
router.post("/productfilters", productFiltersController);

// product count
router.get("/productcount", productCountController);

// product per page
router.get("/productlist/:page", productListController);

// search product
router.get("/search/:keyword", searchProductController);

// similar product
router.get("/related-product/:pid/:cid", realtedProductController);

// category-wise product
router.get("/product-category/:slug", productCategoryController);

// token
router.get("/braintree/token", braintreeTokenController);

// payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
