const mongoose = require('mongoose')
const schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new schema({
    email : {
        type : String , 
        required : true , 
        unique: true 
    },
    password : {
        type: String , 
        required : true  
    }

})

// static sign up method 

userSchema.statics.signup = async function(email,password) {

    // validation 
    if(!email || !password) {
        throw Error('all fields must be filled ')
    }
    if(!validator.isEmail(email)){
        throw Error('this is not an email ')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('this is not a strong password ')
    }
    const exist = await this.findOne({email})

    if(exist ) {
        throw Error('this email already exist ')
    }
    // so now u should add it 
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt) ;
    const user = await this.create({email, password:hash})

    return user 
}

// static login method 

userSchema.statics.login = async function(email,password) {

    // validation 
    if(!email || !password) {
        throw Error('all fields must be filled ')
    }
    if(!validator.isEmail(email)){
        throw Error('this is not an email ')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('this is not a strong password ')
    }
    const user= await  this.findOne({email})

    if(!user) {
        throw Error('this email not exist sign up please ')
    }
   const match = await  bcrypt.compare(password , user.password)

   if(!match){
    throw Error('the password is incorrect ')
   }


    return user 
}



module.exports = mongoose.model('user' , userSchema)