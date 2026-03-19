import mongoose from 'mongoose';
const {Schema} = mongoose
const noticeSchema = new Schema({
    title:{
        type:String,
        required:true},
    description:{
        type:String,
        required:true},
    date:{
        type:Date,
    },
    level:{
        type:String,
        enum:['low','medium','high'],
        default:'low'
    }
   
},{timestamps:true})
const Notice = mongoose.model("Notice",noticeSchema);

export default Notice
