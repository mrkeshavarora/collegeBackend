import Faculty from "../Models/facultyModel.js";
import User from "../Models/userModel.js";

// ============== FACULTY CONTROLLER ==============

// Create Faculty
export async function createFaculty(req, res) {
    const { name, department, qualification, expirence, subjects, phone, email, timmings } = req.body;
    try {
        const check = await Faculty.findOne({ email }); // Better to check by email
        if (check) {
            return res.status(400).send("Faculty with this email already exists");
        }

        // Build a public URL for the uploaded photo
        let photoUrl = null;
        if (req.file) {
            photoUrl = `${req.protocol}://${req.get('host')}/uploads/faculty/${req.file.filename}`;
        }

        const faculty = new Faculty({
            name,
            department,
            qualification,
            expirence,
            subjects,
            phone,
            email,
            timmings,
            photo: photoUrl
        });
        await faculty.save();

        // Automatically create a User account for permissions management
        // Check if user already exists to avoid duplication
        const userExists = await User.findOne({ email });
        if (!userExists) {
            const newUser = new User({
                name,
                email,
                password: "faculty123", // Set a default initial password
                userType: "faculity"
            });
            await newUser.save();
        }

        res.status(201).json(faculty);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating faculty");
    }
}

// Get All Faculty
export async function getAllFaculty(req, res) {
    try {
        const faculty = await Faculty.find();
        res.status(200).json(faculty);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching faculty");
    }
}

// Get Faculty by Department
export async function getFacultyByDepartment(req, res) {
    try {
        const { department } = req.params;
        const faculty = await Faculty.find({ department });
        res.status(200).json(faculty);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching faculty");
    }
}

export async function deleteFaculty(req, res) {
    try {
        const { id } = req.params;
        const faculty = await Faculty.findById(id);
        if (!faculty) {
            return res.status(404).send("Faculty not found");
        }

        const email = faculty.email;
        
        // Delete the faculty record
        await Faculty.findByIdAndDelete(id);

        // Also delete their corresponding user account from permissions
        if (email !== 'admin@gmail.com') { // Prevent deleting the super admin accidentally
            await User.findOneAndDelete({ email });
        }

        res.status(200).send("Faculty and associated user account deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting faculty");
    }
}

export async function updateFaculty(req, res) {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // If a new photo was uploaded, replace the photo URL
        if (req.file) {
            updateData.photo = `${req.protocol}://${req.get('host')}/uploads/faculty/${req.file.filename}`;
        }

        const updatedFaculty = await Faculty.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(updatedFaculty);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating faculty");
    }
}
