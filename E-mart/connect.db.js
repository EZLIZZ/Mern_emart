import mongoose from "mongoose";
const dbUserName = "Alisha";
const dbPassword = "Alisha12";
const dbName = "ncit-emart";
const dbHost = "cluster0.q4hcmlv.mongodb.net";
const connectDB = async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
      );
      
      console.log("DB connection established...");
    } catch (error) {
      console.log("DB connection failed...");
      console.log(error.message);
    }
  };
  
  export default connectDB;




