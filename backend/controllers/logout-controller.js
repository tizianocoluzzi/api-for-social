import User from "../model/User";

export const handleLogout = async (req, res, next)=>{
    const cookies = req.cookies;
    console.log(cookies);
    if(!cookies?.jwt) return res.status(204).json({message: "no content"});
    const refreshToken = cookies.jwt;
    console.log(refreshToken);
    let existingUser;
    //TODO quando aggiorno a list devo cambiare il modo in cui controllo il refresh Token
    try{
        existingUser = User.find({refreshToken: refreshToken});
    } catch(err){
        return console.log(err);
    }
    if(!existingUser){
        res.clearCookie('jwt', {httpOnly: true});
        return res.status(204).json({message: "No content"});
    }
    // Delete the refresh token
    await User.findOneAndUpdate({_id: existingUser._id}, {refreshToken: ""});
    res.clearCookie('jwt', {httpOnly: true});
    return res.status(200).json({message: "logout completed"});
}