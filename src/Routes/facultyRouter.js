import express from 'express'
import { createFaculty, getAllFaculty, getFacultyByDepartment, deleteFaculty, updateFaculty } from '../controller/facultyController.js'
import upload from '../middleware/facultyImageUpload.js'

import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js'

const facultyRouter = express.Router()

// Create faculty — multer handles 'photo' field (multipart/form-data)
facultyRouter.post('/create', authMiddleware, adminMiddleware, upload.single('photo'), createFaculty)

// Get all faculty
facultyRouter.get('/all', getAllFaculty)

// Get faculty by department
facultyRouter.get('/department/:department', getFacultyByDepartment)

// Update faculty — multer handles 'photo' field if a new photo is uploaded
facultyRouter.put('/update/:id', authMiddleware, adminMiddleware, upload.single('photo'), updateFaculty)

// Delete faculty
facultyRouter.delete('/delete/:id', authMiddleware, adminMiddleware, deleteFaculty)

export default facultyRouter
