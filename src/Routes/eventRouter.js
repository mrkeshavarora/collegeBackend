import express from 'express'
import { createEvent, deleteEvent, getAllEvent, getEventById, updateEvent } from '../controller/eventController.js'
import upload from '../middleware/eventImageUpload.js'

import { authMiddleware, combinedMiddleware } from '../middleware/authMiddleware.js'

const eventRouter = express.Router()

// Create event — multer handles 'images' array
eventRouter.post('/create', authMiddleware, combinedMiddleware, upload.array('images', 10), createEvent)

// Get all events
eventRouter.get('/all', getAllEvent);

// Get event by ID
eventRouter.get('/:id', getEventById);

// Update event
eventRouter.put('/update/:id', authMiddleware, combinedMiddleware, upload.array('images', 10), updateEvent);

// Delete Event
eventRouter.delete('/delete/:id', authMiddleware, combinedMiddleware, deleteEvent);

export default eventRouter;



