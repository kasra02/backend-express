import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    resetPasswordLink:String,
    isAdmin:Number,
    role:{
        type:Number,
        default:0,
    },
    shippingAddress: {
        address: { type: String },
        city: { type: String },
        country: { type: String },
    }
});
UserSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next()
    }
    // next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})
UserSchema.methods.matchPassword = async function (enteredPassword){
    // return enteredPassword === this.password
    return await bcrypt.compare(enteredPassword,this.password)
}

// Defines the model that we will use in the app
const User = mongoose.model('User', UserSchema);

export default User