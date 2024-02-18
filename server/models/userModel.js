import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    Contact: {
        type : Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    reEnterPassword: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    }
})

export default mongoose.model("users", userSchema);
