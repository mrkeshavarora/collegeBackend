import express from 'express'
import { createNotice, deleteNotice, getAllNotices, updateNotice, getSingleNotice } from '../controller/noticeController.js'

import { authMiddleware, combinedMiddleware } from '../middleware/authMiddleware.js'

const noticeRouter = express.Router()

// Create notice
noticeRouter.post('/create', authMiddleware, combinedMiddleware, createNotice)

// Get all notices
noticeRouter.get('/all', getAllNotices)
noticeRouter.get('/getSingle/:id', getSingleNotice)
noticeRouter.delete('/delete/:id', authMiddleware, combinedMiddleware, deleteNotice)
noticeRouter.put('/update/:id', authMiddleware, combinedMiddleware, updateNotice)

export default noticeRouter
 