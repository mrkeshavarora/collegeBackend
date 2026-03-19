import mongoose from 'mongoose';
const {Schema} = mongoose
const facultySchema = new Schema({
    name:String,
    department:String,
    qualification:String,
    experience:String,
    subjects:String,
    phone:String,
    email:String,
    timings:String,
    photo: {
        type: String,
        default: null
    },
},{timestamps:true})

const Faculty = mongoose.model("Faculty",facultySchema);

export default Faculty