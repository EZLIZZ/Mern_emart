import express from "express";
import User from "./user.model.js";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";


const router = express.Router();

//register user
router.post("/user/register", async(req,res)=>{

    // extract new user from req.body

    const newUser = req.body;

    // check if user with provided email  already exists
    const user = await User.findOne({email: newUser.email});

    // if user, throw error
      if (user){
        return res.status(409).send({message:"email already exists."});
      }


    // hash password before saving user
    const plainPassword = newUser.password;
    
    // saltRound => adds randomness to generated password
    const saltRound = 10; //1 to 32
    const hashedPassword = await bcrypt.hash(plainPassword,saltRound);

    //update user password with hashed password
    newUser.password = hashedPassword;

    // save user
    await User.create(newUser);

    // send res

    return res.status(201).send({message: "user is registered successfully.."});

});

// login user
//! body bata kei aairaxa vane tyo get method huna sakdaina it has to be post or other maybe
router.post("/user/login",async(req,res)=>{

    // extract login credentias from req.body

    const loginCredentials = req.body;

    // find user using email
    const user = await User.findOne({email: loginCredentials.email});
    // console.log(user);
    // if not user, throw error
    if (!user){
      return  res.status(404).send({message:"Invalid Credentials"});
    }
    
    //check for password match
    const plainPassword = loginCredentials.password;
    const hashedPassword = user.password;
    const isPasswordMatch = await bcrypt.compare(plainPassword,hashedPassword);

    //if not password match, throw error
     if (!isPasswordMatch){
        return res.status(404).send({message:"Invalid credentials"});
     }
    // generate token
    //payload kosko info bokiraxa
    const payload = {email: user.email};
    const signature = "asdfghjkl";
    const token = jwt.sign(payload,signature);

    //hide hashed password 
    user.password=undefined;
    //send res

    return res.status(200).send({message:"success",accessToken: token, userDetail: user});
});
router.get("/user/detail",(req,res)=>{
    const userName = req.body.name;
    if (typeof userName !== "string"){
        return res.status(400).send({message:"Name must be a string"});
    }
    next();
})

export default router;