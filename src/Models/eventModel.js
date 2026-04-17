import mongoose from 'mongoose';
const {Schema} = mongoose
const eventSchema = new Schema({
    title:String,
    description:String,
    date:Date,
    location:String,
    images: [{
        type: String,
        default: null
    }],
    timmings:String,
},{timestamps:true})
const Event = mongoose.model("Event",eventSchema);
export default Event
