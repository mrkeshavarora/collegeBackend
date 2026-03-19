import mongoose from 'mongoose';
const {Schema} = mongoose
const gallerySchema = new Schema({
    title:String,
    location:String,
    images: [{
        type: String,
        default: null
    }],
    timmings:String,
},{timestamps:true})
const Gallery = mongoose.model("Gallery",gallerySchema);

export default Gallery