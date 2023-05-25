import express from "express";
import { requireSignIn ,isAdmin} from "./../middlewares/authMiddleware.js";
import {
  allCategoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

//routes
// create category
router.post(
  "/createcategory",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/updatecategory/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getALL category
router.get("/allcategory", allCategoryController);

//single category
router.get("/singlecategory/:slug", singleCategoryController);

//delete category
router.delete(
  "/deletecategory/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
