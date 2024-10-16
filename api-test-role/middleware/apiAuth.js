const jwt = require('jsonwebtoken');
const User = require('../model/apiModel');



// To authorize and verify JsonWebToken
const auth = async (req,res,next)=>{
 
    try{
        const token = req.header("Authorization").replace("Bearer ","");
        const decoded = jwt.verify(token, "umair");
        const user = await User.findOne({
            _id: decoded._id,
             "tokens.token":token
        }) 
        if(!user){
            throw new Error()
        }
        req.user = user;
        next();

    }catch(error){
        res.send({error: "please Auth"})
    }

}

//  To check admin role
const isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.sendStatus(403);
    }
};

module.exports = {auth,isAdmin};