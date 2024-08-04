import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const handleRefreshToken = async (req, res, next)=>{
    const cookies = req.cookie;
    if(!cookies?.jwt) return res.status(401).json({message: "forbidden"});
    const refreshToken = cookies.jwt;
    //TODO fare cio di cui sotto
    //in teoria bisognerebbe avere un database aggiornato coi vavri refreshToken, step che andava fatto nel login e nel signup, 
    //andava cioe aggiunto il primo refresh token, io non l'ho fatoo quindi adessso mi attacco abbastanza al cazzo 
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
    //il tutorial setta roba per fare il logout ma con roba strana
    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000});
    return res.status(200).json({accessToken: accessToken});
}