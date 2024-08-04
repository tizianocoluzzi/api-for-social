import jwt from 'jsonwebtoken';
import  dotenv from 'dotenv';
dotenv.config();

export const verifyJWT = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401).json({message:"non autorizzato"});
    console.log(authHeader);
    const token = authHeader.split(" ")[1];
    jwt.verify(
        token,
        process.env.ACCES_TOKEN_SECRET, 
        (err, decoded)=>{
            if(err) return res.status(403).json({message:"invalid token"});
            req.user = decoded.email;
            next();
            });
}