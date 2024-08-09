import jwt from 'jsonwebtoken';
import  dotenv from 'dotenv';
dotenv.config();

export const verifyJWT = (req, res, next) =>{
    console.log("chiamata verify JWT");
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if(!authHeader) return res.status(401).json({message:"non autorizzato"});
    console.log(authHeader);
    const token = authHeader.split(" ")[1];
    console.log(token);
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET, 
            (err, decoded)=>{
                if(err) return res.status(403).json({message:err});
                req.user = decoded.email;
                next();
            }
        );
    
}