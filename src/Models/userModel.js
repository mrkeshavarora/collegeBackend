import mongoose from "mongoose";
const {Schema} = mongoose

const userSchema = new Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:String,
    userType:{
        type:String,
        enum:["admin","staff","faculity"],
        default:"faculity"
    }


},{timestamps:true})


const User = mongoose.model("User",userSchema)
export default User
