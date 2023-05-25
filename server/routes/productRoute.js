import express from "express";
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
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();
import formidable from "express-formidable"
//routes
router.post(
  "/createproduct",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//routes
router.put(
  "/updateproduct/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/getproduct", getProductController);
//get farmer products
// router.get("/getaddedproducts", getaddedProductController);

//single product
router.get("/getproduct/:slug", getSingleProductController);

router.get("/productphoto/:pid", productPhotoController);
//delete rproduct
router.delete("/deleteproduct/:id", deleteProductController);

//filter product
router.post("/productfilters", productFiltersController);

//product count
router.get("/productcount", productCountController);

//product per page
router.get("/productlist/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
