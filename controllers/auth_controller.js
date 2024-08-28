require('dotenv').config();
const userScheme = require("../models/userSchema")
const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY_env
// const fetchUserData = require("../middleWare/fetchUser")
const register = async(req,res)=>{
    try {
        const user = await userScheme.findOne({"email":req.body.email})
        if(user){
            res.status(404).send("Account already exist`")
        }
        const createdDetails = await userScheme.create(req.body)
        res.status(200).json({
            createdDetails,
            token:await createdDetails.generateToken(),
            userId : createdDetails._id.toString()
        })

    } catch (error) {
        console.log(error)
        res.status(500).json("Page nt found");
    }
}

const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await userScheme.findOne({email})
        if(!user){
            return res.status(400).json({Error:"Invalid Login Details"})
        }
        const isValidate = await user.comaprePassword(password)
        if(!isValidate){
            res.status(500).json({message:"InValid login details"})
        }
        else{
            res.status(200).json({
                token:await user.generateToken(),
                userId : user._id.toString() 
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const fetchUser = async (req, res) => {
    try {
        const tokenId = req.header("AuthToken");
        if (!tokenId) {
            return res.status(400).json({ error: "Please enter valid authentication" });
        }

        let decoded;
        try {
            // console.log("Token:",tokenId);
            decoded = jwt.verify(tokenId, SECRET_KEY);
            
            console.log("decoded:", decoded);
        } catch (error) {
            console.log(error);
            return res.status(401).json({ error: "Invalid token or token expired" });
        }

        req.user = decoded;
        const userId = req.user.id;
        const user = await UserScheme.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server Error" });
    }
};

module.exports = { register, login, fetchUser };


/*
const fetchUser = async(req,res)=>{
    try {
        const tokenId = req.header("AuthToken")
        if(!tokenId){
            res.status(400).send({error:"Please Enter valid authentication1"})
        }
        try {
            const decoded = jwt.verify(tokenId,SECRET_KEY)
            console.log("decoded:",decoded);
            
            res.user = decoded;
            next()
        } catch (error) {
            console.log(error);
            res.status(401).send({error:"Please Enter valid authentication2"})
        }
        userId = req.userScheme.id;
        const useer = await userScheme.findById(userId).select("-password")
        res.send(useer)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
}
*/
module.exports = {register,login,fetchUser}