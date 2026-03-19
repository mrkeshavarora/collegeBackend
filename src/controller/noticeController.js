import Notice from "../Models/noticeModel.js";

// ============== NOTICE CONTROLLER ==============

// Create Notice
export async function createNotice(req, res) {
    try {
        const { title, description, date, level } = req.body;
        const check = await Notice.findOne({ title });
        if (check) {
            return res.status(400).send("Notice already exists");
        }
        const notice = new Notice({ title, description, date, level });
        await notice.save();
        res.status(201).json(notice);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating notice");
    }
}

// Get single notice
export async function getSingleNotice(req, res) {
    try {
        const { id } = req.params;
        const notice = await Notice.findById(id);
        if (!notice) {
            return res.status(404).send("Notice not found");
        }
        res.status(200).json(notice);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching notice");
    }
}
// update notice
export async function updateNotice(req, res) {
    try {
        const { id } = req.params;
        const notice = await Notice.findByIdAndUpdate({_id: id}, req.body, { returnDocument: "after" });
        if (!notice) {
            return res.status(404).send("Notice not found");
        }
        res.status(200).json(notice);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating notice");
    }
}

// delete notice
export async function deleteNotice(req, res) {
    try {
        const { id} = req.params;
        const notice = await Notice.findByIdAndDelete(id);
        if (!notice) {
            return res.status(404).send("Notice not found");
        }
        res.status(200).json(notice);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting notice");
    }
}
// Get All Notices  
export async function getAllNotices(req, res) {
    try {
        const notices = await Notice.find();
        res.status(200).json(notices);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching notices");
    }
}

