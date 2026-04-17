import Admin from "../Models/adminModel.js";

// ============== ADMIN CONTROLLER ==============

// Create Admin
export async function createAdmin(req, res) {
    try {
        const { name, email, password } = req.body;
        const check = await Admin.findOne({ email });
        if (check) {
            return res.status(400).send("Admin already exists");
        }
        const admin = new Admin({ name, email, password });
        await admin.save();
        res.status(201).json(admin);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating admin");
    }
}
// 

// Get All Admins
export async function getAllAdmins(req, res) {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching admins");
    }
}