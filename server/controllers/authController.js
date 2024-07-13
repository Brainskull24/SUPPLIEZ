import JWT from "jsonwebtoken";

import userModel from "../models/userModel.js";
import feedModel from "../models/feedModel.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";

// register
export const registerController = async (req, res) => {
  try {
    const { name, email, password, age, reEnterPassword, Contact } = req.body;

    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!reEnterPassword) {
      return res.send({ message: "Confirm Password is Required" });
    }
    if (!age) {
      return res.send({ message: "Age is Required" });
    }
    if (!Contact) {
      return res.send({ message: "Contact is Required" });
    }

    // check if user exists
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "User already registered! Please Login",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      age,
      reEnterPassword,
      Contact,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registeration Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registrating User!",
      error,
    });
  }
};

// login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password!",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User is not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Wrong Password!",
      });
    }

    // token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "User logged in successfully!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        password: user.password,
        Contact: user.Contact,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in logging in user!",
      error,
    });
  }
};

// forgotpassword
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, Contact, password } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!Contact) {
      res.status(400).send({ message: "Contact is required" });
    }
    if (!password) {
      res.status(400).send({ message: "New Password is required" });
    }

    // check if user exists
    const user = await userModel.findOne({ email, Contact });

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Contact",
      });
    }

    const hashed = await hashPassword(password);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// feedback
export const feedbackController = async (req, res) => {
  try {
    const { name, email, feedbacktext } = req.body;

    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!feedbacktext) {
      return res.send({ message: "Feedback is Required" });
    }

    const feedback = await new feedModel({
      name,
      email,
      feedbacktext,
    }).save();

    res.status(201).send({
      success: true,
      message: "Feedback sent Successfully",
      feedback,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error",
      error,
    });
  }
};

// update profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, age, Contact } = req.body;
    const user = await userModel.findById(req.user._id);

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        Contact: Contact || user.Contact,
        age: age || user.age,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully!",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Updating profile!",
      error,
    });
  }
};

// get user orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Geting Orders!",
      error,
    });
  }
};

// get all orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Orders!",
      error,
    });
  }
};

// get order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updating Order status!",
      error,
    });
  }
};
