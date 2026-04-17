import mongoose from 'mongoose';
const {Schema} = mongoose;
const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    duration:String,
    eligibility:String,
    fee:Number,
    description:String,
    photo: {
        type: String,
        default: null
    },
    level: {
        type: String,
        enum: ['undergraduate', 'postgraduate'],
        required: true
    }
})


const Course = mongoose.model("Course", courseSchema);

export default Course