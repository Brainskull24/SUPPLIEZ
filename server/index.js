import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
const PORT = process.env.PORT || 9002
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";

//middlewares
const app = express()
app.use(express.json())
app.use(cors())

//CONFIG
dotenv.config()

//DATABASE
connectDB()

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/query", authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.listen(PORT,() => {
    console.log(`Suppliez server started at ${PORT}`)
})