import mongoose from "mongoose";
const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL,{
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useFindAndModify: false 
        });
        console.log(
          `Connected To Mongodb Database` 
        );
      } catch (error) {
        console.log(`Error in Mongodb`);
      }
    };

export default connectDB;
