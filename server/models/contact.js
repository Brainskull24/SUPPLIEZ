import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    contact: {
        type : Number,
        required: true
    },
    query: {
        type : String,
        required: true
    }
})

export default mongoose.model("contacts", contactSchema);
