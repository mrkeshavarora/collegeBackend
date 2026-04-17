import NonTeachingFaculty from "../Models/nonTeachingFacultyModel.js";

// Create Non-Teaching Faculty
export async function createNonTeachingFaculty(req, res) {
    const { name, designation, email, phone } = req.body;
    try {
        const check = await NonTeachingFaculty.findOne({ email });
        if (check) {
            return res.status(400).send("Faculty with this email already exists");
        }

        let photoUrl = null;
        if (req.file) {
            photoUrl = `${req.protocol}://${req.get('host')}/uploads/faculty/${req.file.filename}`;
        }

        const faculty = new NonTeachingFaculty({
            name,
            designation,
            email,
            phone,
            photo: photoUrl
        });
        await faculty.save();

        res.status(201).json(faculty);
    } catch (error) {
        console.error("Error in createNonTeachingFaculty:", error);
        res.status(500).json({ 
            message: "Error creating non-teaching faculty", 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}

// Get All Non-Teaching Faculty
export async function getAllNonTeachingFaculty(req, res) {
    try {
        const faculty = await NonTeachingFaculty.find().sort({ createdAt: -1 });
        res.status(200).json(faculty);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching non-teaching faculty");
    }
}

// Update Non-Teaching Faculty
export async function updateNonTeachingFaculty(req, res) {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.file) {
            updateData.photo = `${req.protocol}://${req.get('host')}/uploads/faculty/${req.file.filename}`;
        }

        const updatedFaculty = await NonTeachingFaculty.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(updatedFaculty);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating non-teaching faculty");
    }
}

// Delete Non-Teaching Faculty
export async function deleteNonTeachingFaculty(req, res) {
    try {
        const { id } = req.params;
        await NonTeachingFaculty.findByIdAndDelete(id);
        res.status(200).send("Non-teaching faculty deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting non-teaching faculty");
    }
}
