import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from "../model/User.js";
dotenv.config();

export const handleRefreshToken = async (req, res, next)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401).json({message: "forbidden"});
    const refreshToken = cookies.jwt;
    let existingUser;
    try{
        existingUser = await User.findOne({refreshToken: {"$in": refreshToken}});
    } catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(403).json({message: "Forbidden"});
    }
    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            console.log(decoded);
            console.log(existingUser);
            if(err || existingUser.email !== decoded.email) return res.status(403).json({message: "forbidden 2"});
            const accesToken = jwt.sign({"email": decoded.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'});
            res.status(200).json({accesToken});
        }
    )
    
}