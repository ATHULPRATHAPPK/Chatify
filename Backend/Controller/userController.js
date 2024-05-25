const User = require('../Model/UserSchema');



export const listUser= async (req,res)=>{
    try{
        const users=await User.find()
        res.status(201).json({users});
    }catch(error){
        res.status(500).json({ message: error.message });

    }
}