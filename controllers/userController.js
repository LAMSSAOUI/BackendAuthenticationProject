const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

// create token 
const createToken = ({_id}) =>{
   return  jwt.sign({_id} , process.env.SECRET , {expiresIn : '3d'})
}



 // make functions 
const signupUser = async  (req ,res ) => {
    const {email, password} = req.body 
    try {
        user = await User.signup(email,password)

        const token = createToken('user._id')

        res.status(200).json({email , token})
    }catch(err) {
        res.status(400).json({err : err.message})
    }
}

const loginUser = async (req,res ) => {
    const {email , password } = req.body 
    try{
        user = await User.login(email, password)

        token = createToken(user._id)

        res.status(200).json({email,token})
    }catch(err) {
        res.status(400).json({err : err.message})
    }
}

module.exports={
    signupUser,
    loginUser
}
