import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sname: {
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
    Quantity: {
        type: Number,
        required: true,
    },
    Price:{
        type: Number,
        required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    Unit:{
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Products", ProductSchema);
