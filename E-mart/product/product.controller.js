import express from "express";
import Product from "./product.model.js";

const controller = express.Router();

// add product
controller.post("/product/add",async (req,res)=>{
    //extract new product from req body
    const newProduct = req.body;
   //add product
    await Product.create(newProduct);
   //send res

    return res.status(200).send({message:"product is added successfully"});
});

export default controller;
//default lai import garda gardai name change garna milxa and yesko name change gareko xa indexjs ma
// euta file bata eeuta matra default export garna milxa

