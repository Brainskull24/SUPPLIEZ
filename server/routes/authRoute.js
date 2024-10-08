import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  feedbackController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";

// middlewares
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// register and login
router.post("/register", registerController);
router.post("/login", loginController);

// Forgot Password
router.post("/forgot-password", forgotPasswordController);

router.post("/feedback", feedbackController);

// protected Farmer route auth
router.get("/supplier", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected Admin route auth
router.get("/admin", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile", requireSignIn, updateProfileController);

// user orders
router.get("/orders", requireSignIn, getOrdersController);

// all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
