import express from 'express'
import { createCourse, deleteCourse, getAllCourses, updateCourse } from '../controller/courseContoller.js'
import upload from '../middleware/courseImageUpload.js'

import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js'

const courseRouter = express.Router()

// Create course
courseRouter.post('/create', authMiddleware, adminMiddleware, upload.single('photo'), createCourse)

// Get all courses
courseRouter.get('/all', getAllCourses)

// Update course
courseRouter.put('/update/:id', authMiddleware, adminMiddleware, upload.single('photo'), updateCourse)

// Delete course
courseRouter.delete('/delete/:id', authMiddleware, adminMiddleware, deleteCourse)

export default courseRouter
