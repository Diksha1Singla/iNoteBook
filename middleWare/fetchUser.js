const jwt = require("jsonwebtoken")

export const fetchuser = (req,res,next)=>{
    const token = req.header("AuthToken")
    if(!token){
        res.status(400).send({error:"Please Enter valid authentication"})
    }

    try {
        const string = jwt.verify(token,"kjkhfdftfyguhijlihkugyjfhtdffg")
        req.user = data.user
        next()
    } catch (error) {
        console.log(error);
        res.status(401).send({error:"Please Enter valid authentication"})
    }

}