import StudentResource from "../Models/studentResourceModel.js";

// ============== STUDENT RESOURCE CONTROLLER ==============

// Create Student Resource
export async function createStudentResource(req, res) {
    const { name, location, timmings } = req.body;
    try {
        const check = await StudentResource.findOne({ name });
        if (check) {
            return res.status(400).send("Student Resource already exists");
        }
        const resource = new StudentResource({ name:name, location:location, timmings:timmings });
        await resource.save();
        res.status(201).json(resource);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating student resource");
    }
}

// Get All Student Resources
export async function getAllStudentResources(req, res) {
    try {
        const resources = await StudentResource.find();
        res.status(200).json(resources);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching student resources");
    }
}


