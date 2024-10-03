import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

const isValidUser =async(req,res,next) =>{

    const authorization = req.headers.authorization;

    // literally splits the incoming value
    const splittedValues = authorization?.split(" ");

    const token = splittedValues?.length === 2 ? splittedValues[1]:null;

    if (!token){
        return res.status(401).send({message :"unauthorized"});

    }
    
    let payload;
    try {
        const signature = process.env.ACCESS_TOKEN_KEY;
        payload = jwt.verify(token,signature);
    } catch (error) {
        return res.status(401).send({message :"Unauthorized"});
    }
  const user = await User.findOne({email: payload.email});

  if (!user){
    return res.status(404).send({message: "unauthorized"});
  }
  next();
};

export {isValidUser};