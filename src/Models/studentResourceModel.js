import mongoose from 'mongoose';
const {Schema} = mongoose
const studentResourceSchema = new Schema({
    name:String,
    location:String,
    
    timmings:String,
},{timestamps:true})
const StudentResource = mongoose.model("StudentResource",studentResourceSchema);

export default StudentResource