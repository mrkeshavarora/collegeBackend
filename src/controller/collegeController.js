import College from "../Models/collegeModel.js";

// ============== COLLEGE CONTROLLER ==============

// Create College
// export async function createCollege(req, res) {
//     const { name, email, address, timmings } = req.body;
//     try {
//         const check = await College.findOne({ email });
//         if (check) {
//             return res.status(400).send("College already exists");
//         }
//         const collegeOption = new College({ 
//             name: name, 
//             email: email,
//             address:address, 
//             timmings: timmings ,
//             phone:phone,
//             description:description,
//             mission:mission,
//             vision:vision
//         });
//         await collegeOption.save();
//         res.status(201).json(collegeOption);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Error creating college");
//     }
// }

// Get All Colleges
export async function getAllColleges(req, res) {
    try {
        const colleges = await College.find();
        res.status(200).json(colleges);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching colleges");
    }
}

// Get College by ID
// export async function getCollegeById(req, res) {
//     try {
//         const { id } = req.params;
//         const college = await College.findOne({ _id: id });
//         if (!college) {
//             return res.status(404).send("College not found");
//         }
//         res.status(200).json(college);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Error fetching college");
//     }
// }

// Update College
export async function updateCollege(req, res) {
    try {
        // Find the first college by _id ascending
        const firstCollege = await College.findOne().sort({ _id: 1 });
        if (!firstCollege) {
            return res.status(404).send("No college found to update");
        }

        const updateData = { ...req.body };
        if (req.files && req.files.length > 0) {
            updateData.image = req.files.map(file =>
                `${req.protocol}://${req.get('host')}/uploads/college/${file.filename}`
            );
        }

        const updatedCollege = await College.findByIdAndUpdate(
            firstCollege._id,
            updateData,
            { returnDocument: "after", new: true }
        );
        res.status(200).json(updatedCollege);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating college");
    }
}

// Delete College
// export async function deleteCollege(req,res){
//     try {
//         const { id } = req.params;
//         const college = await College.findByIdAndDelete({ _id: id });
//         if (!college) {
//             return res.status(404).send("College not found");
//         }
//         res.status(200).json(college);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Error deleting college");
//     }
// }