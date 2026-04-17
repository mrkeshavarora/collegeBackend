import express from 'express'
import { createGallery, getAllGallery, getGalleryById, updateGallery, deleteGallery } from '../controller/galleryController.js'
import uploadGallery from '../middleware/galleryImageUpload.js'

import { authMiddleware, combinedMiddleware } from '../middleware/authMiddleware.js'

const galleryRouter = express.Router()

// Create gallery — up to 10 images
galleryRouter.post('/create', authMiddleware, combinedMiddleware, uploadGallery.array('images', 10), createGallery)

// Get all gallery items
galleryRouter.get('/all', getAllGallery)

// Get gallery item by ID
galleryRouter.get('/:id', getGalleryById)

// Update gallery item — optionally replace images
galleryRouter.put('/update/:id', authMiddleware, combinedMiddleware, uploadGallery.array('images', 10), updateGallery)

// Delete gallery item
galleryRouter.delete('/delete/:id', authMiddleware, combinedMiddleware, deleteGallery)

export default galleryRouter
