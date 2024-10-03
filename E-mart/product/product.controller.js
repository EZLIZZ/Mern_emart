import express from "express";
import Product from "./product.model.js";
import { isValidUser } from "./user.authorize.js";
import mongoose from "mongoose";

const router = express.Router();

// add product
router.post("/product/add",isValidUser, async (req,res)=>{
    //extract new product from req body
    const newProduct = req.body;
   //add product
    await Product.create(newProduct);
   //send res

    return res.status(200).send({message:"product is added successfully"});
});

// //!get product by id
  router.get("/product/detail/:id", isValidUser, async(req,res)=>{
    const productId = req.params.id;
    
    const isValidId = mongoose.isValidObjectId(productId);

    if (!isValidId){
      return  res.status(400).send({message:"Invalid id"});
    }

    const product = await Product.findOne({_id: productId});
//product nai xaina vane
    if (!product){
      return  res.status(404).send({message:"product doesnt exist"});
    }

    return res.status(200).send({message:"success", productDetail: product});
  });


//! delete
router.delete("/product/delete/:id", isValidUser, async (req, res) => {
    // extract product id from req.params
    const productId = req.params.id;
  
    // check for mongo id validity
    const isValidId = mongoose.isValidObjectId(productId);
  
    // if not valid mongo id, throw error
    if (!isValidId) {
      return res.status(400).send({ message: "Invalid mongo id." });
    }
  
    // find product
    const product = await Product.findOne({ _id: productId });
  
    // if not product found, throw error
    if (!product) {
      return res.status(404).send({ message: "Product does not exist." });
    }
  
    // delete product
    await Product.deleteOne({ _id: productId });
  
    // send res
    return res.status(200).send({ message: "Product is deleted successfully." });
  });
  

//! edit
router.put("/product/edit/:id", async(req,res)=>{
    const productId = req.params.id;
    
    const isValidId = mongoose.isValidObjectId(productId);

    if (! isValidId){
        return res.status(400).send({message:"Id is not valid"});
    }

    const product = await Product.findOne({ _id: productId});

    if(!product){
        return res.status(404).send({message:"produt doesnt exist"});
    
    }
    const newValues = req.body;

    await Product.updateOne(
        { _id: productId },
        {
          $set: { ...newValues },
        }
      );


    return res.status(200).send({message:"edited successfully"});
    });

//! list

   router.post("/product/list", async(req,res)=>{
    const category = req?.body?.category;

    let match ={};

    if (category){
        match = {category:category};
    }
    const products = await Product.find(match,{
        name:1,
        price:1,
        description:1,
        brand:1,
    });
    return res.status(200).send({message:"success", productList :products });
   });


export default router;
//default lai import garda gardai name change garna milxa and yesko name change gareko xa indexjs ma
// euta file bata eeuta matra default export garna milxa



