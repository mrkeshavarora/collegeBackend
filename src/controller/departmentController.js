import Department from "../Models/departmentModel.js";

// Create Department
export async function createDepartment(req, res) {
    const { name } = req.body;
    try {
        const check = await Department.findOne({ name });
        if (check) {
            return res.status(400).send("Department already exists");
        }
        const department = new Department({ name });
        await department.save();
        res.status(201).json(department);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating department");
    }
}

// Get All Departments
export async function getAllDepartments(req, res) {
    try {
        const departments = await Department.find().sort({ name: 1 });
        res.status(200).json(departments);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching departments");
    }
}

// Update Department
export async function updateDepartment(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedDepartment = await Department.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).json(updatedDepartment);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating department");
    }
}

// Delete Department
export async function deleteDepartment(req, res) {
    try {
        const { id } = req.params;
        await Department.findByIdAndDelete(id);
        res.status(200).send("Department deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting department");
    }
}
