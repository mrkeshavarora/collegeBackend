import express from 'express'
import { createAdmin, getAllAdmins } from '../controller/adminContoller.js'
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js'

const adminRouter = express.Router()

// Create admin
adminRouter.post('/create', authMiddleware, adminMiddleware, createAdmin)

// Get all admins
adminRouter.get('/all', authMiddleware, adminMiddleware, getAllAdmins)

export default adminRouter
