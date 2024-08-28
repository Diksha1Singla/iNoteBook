const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
        // required:true
    }
})

userSchema.methods.comaprePassword =async function(password){
    return bcrypt.compare(password,this.password)
}

userSchema.pre("save",async function(next){
    try {
        if(this.isModified("password"))  {
            this.password = await bcrypt.hash(this.password,10)
        }                       //chk if password changed
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId : this._id.toString(),
            email:this.email
        },"sdfghjklgfghjkuytrdxcvbnmiuytreszpoiuytrewsdxcnm",{
            expiresIn:"14d"
        })
    } catch (error) {
        console.log(error);
    }
}

const user = new mongoose.model("user",userSchema)
module.exports = user