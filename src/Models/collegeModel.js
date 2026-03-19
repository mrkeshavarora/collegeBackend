import mongoose from 'mongoose';
const {Schema} = mongoose
const collegeSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    location:String,
    timmings:String,
    phone:Number,
    description:String,
    mission:String,
    vision:String

},{timestamps:true})
const College = mongoose.model("College",collegeSchema);

export default College