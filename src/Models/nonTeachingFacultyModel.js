import mongoose from 'mongoose';

const nonTeachingFacultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: null
    }
}, { timestamps: true });

const NonTeachingFaculty = mongoose.model('NonTeachingFaculty', nonTeachingFacultySchema);

export default NonTeachingFaculty;
