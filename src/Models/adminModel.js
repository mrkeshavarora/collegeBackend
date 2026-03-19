import mongoose from "mongoose";
const { Schema } = mongoose;
const adminSchema = new Schema({
    name: String,
    email: String,
    password: String
},{timestamps:true})

const Admin = mongoose.model("Admin", adminSchema);
export default Admin