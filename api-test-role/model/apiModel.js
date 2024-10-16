const mongoose =require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');



// new mongoose schema
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required : true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user',
    },
    tokens:[
        {
            token:{
                type:String
            }
        }
    ]
},{
    Timestamp:true,
})



// convert simple password into hash password 
userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
});



// for find person login & generate token
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email});
    const check = await bcrypt.compare(password,user.password);     
    if(!check){
        throw new Error()
    }
    return user;
}



// for generate jsonwebtoken
userSchema.methods.generateAuthToken = async function(){
const user = this;
const token = jwt.sign({_id: user._id.toString()},"umair",{
    expiresIn:'24h'
});
user.tokens = user.tokens.concat({token});
await user.save();
return token;
}



const User = mongoose.model('Users', userSchema);

module.exports = User;