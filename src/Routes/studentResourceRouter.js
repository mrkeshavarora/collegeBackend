import express from 'express'
import { createStudentResource, getAllStudentResources } from '../controller/studentResourceController.js'

const studentResourceRouter = express.Router()

// Create student resource
studentResourceRouter.post('/create', createStudentResource)

// Get all student resources
studentResourceRouter.get('/all', getAllStudentResources)

export default studentResourceRouter
