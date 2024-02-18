import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sellername: {
      type: String,
      required:true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    unit:{
        type: String,
        required: true,
    },
    photos: [
      {
        data: Buffer,
        contentType: String,
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

export default mongoose.model("Products", ProductSchema);
