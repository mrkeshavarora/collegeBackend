import mongoose from 'mongoose';
const {Schema} = mongoose
const noticeSchema = new Schema({
   
},{timestamps:true})
const Notice = mongoose.model("Notice",noticeSchema);

export default Notice