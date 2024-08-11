import dotenv from 'dotenv';
dotenv.config();
import User from "../model/User.js";
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';

import jwt from 'jsonwebtoken';

export const getAllUser = async(req, res, next) => {
    //console.log(jwt.decode(req.headers.cookie.split("=")[1]));
    let users;
    try{
        users= await User.find();//non c'è nessun filter quindi prende tutte le occorrenze
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message: "No User Found"});
    }
    return res.status(200).json({users})
}

export const signup = async (req, res, next)=>{
    //console.log(req);
    const {name, email, password} = req.body;
    
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    } catch(err){
        return console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message: "User Alresy Exist"});
    }

    const hashedPassword = bcrypt.hashSync(password); //password criptata
    const user = new User({
        name, 
        email, 
        password: hashedPassword,
        blogs : [],
        refreshToken: [],
    });
    //si usa il try catch ogni volta che si interagisce col databases
    try{
        user.save();
    }catch(err){
        return console.log(err);
    }
    return res.status(201).json({user});
}

export const login = async (req, res, next)=>{
    const {email, password } = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    } catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({message: "Couldn't Find User By This Email"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message: "password is incorrect"});
    }
    //al momento utilizzo solo la mail nel sign perche la password è un dato sensibile
    const accessToken = jwt.sign({"email":email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30s"});
    const refreshToken = jwt.sign({"email":email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "5m"});
    //inserisco il refreshToken nel database
    try{
        existingUser = await User.findOneAndUpdate({_id: existingUser.id}, {$push : {refreshToken: refreshToken}}, {new: true});
        //existingUser.save();
        //console.log(existingUser);
    }catch(err){
        console.log(err);
    }
    res.cookie('jwt', refreshToken, {httpOnly: true,sameSite: 'None', secure : true ,maxAge: 24*60*60*1000});
    return res.status(200).json({accessToken: accessToken});
}