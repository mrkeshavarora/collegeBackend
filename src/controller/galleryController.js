import Gallery from "../Models/galleryModel.js";

// ============== GALLERY CONTROLLER ==============

// Create Gallery
export async function createGallery(req, res) {
    const { title, location, timmings } = req.body;
    try {
        const check = await Gallery.findOne({ title });
        if (check) {
            return res.status(400).send("Gallery already exists");
        }
        // Build public URLs for each uploaded image
        let images = [];
        if (req.files && req.files.length > 0) {
            images = req.files.map(file =>
                `${req.protocol}://${req.get('host')}/uploads/gallery/${file.filename}`
            );
        }
        const gallery = new Gallery({ title, location, images, timmings });
        await gallery.save();
        res.status(201).json(gallery);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating gallery");
    }
}

// Get All Gallery
export async function getAllGallery(req, res) {
    try {
        const gallery = await Gallery.find();
        res.status(200).json(gallery);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching gallery");
    }
}

// Get Gallery by ID
export async function getGalleryById(req, res) {
    try {
        const { id } = req.params;
        const gallery = await Gallery.findById(id);
        if (!gallery) return res.status(404).send("Gallery not found");
        res.status(200).json(gallery);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching gallery");
    }
}

// Update Gallery
export async function updateGallery(req, res) {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // If new images were uploaded, replace the images array with new URLs
        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map(file =>
                `${req.protocol}://${req.get('host')}/uploads/gallery/${file.filename}`
            );
        }

        const updated = await Gallery.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating gallery");
    }
}

// Delete Gallery
export async function deleteGallery(req, res) {
    try {
        const { id } = req.params;
        await Gallery.findByIdAndDelete(id);
        res.status(200).send("Gallery deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting gallery");
    }
}
