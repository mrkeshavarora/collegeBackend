import express from 'express'
import { getAllColleges, updateCollege } from '../controller/collegeController.js'
import uploadCollege from '../middleware/collegeImageUpload.js';

const collegeRouter = express.Router()

// Create college
// collegeRouter.post('/create', createCollege)

// Get all colleges
collegeRouter.get('/all', getAllColleges)
collegeRouter.put('/update', uploadCollege.array('image', 5), updateCollege)
// collegeRouter.delete('/:id', deleteCollege)

export default collegeRouter