import express from "express"
import connectDB from "./connect.db.js";
import productRoutes from "./product/product.controller.js";
import userRoutes from "./user/user.controller.js"
import cors from "cors";
//default export vako vayera yesko name change gareko

const app = express();
//to make app  understand json
app.use(express.json());

// connect database
connectDB();

//TODO:CORS
// ? CORS- cross origin resource sharing
app.use(cors());
//TODO:api version

//register routes
app.use(productRoutes);
app.use(userRoutes);

//TODO; global error handler
// network port and server

const PORT =7000;
app.listen(PORT,()=>{
    console.log(`app is listening to port${PORT}`);
});



