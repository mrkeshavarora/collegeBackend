import express from 'express';
import { createNonTeachingFaculty, getAllNonTeachingFaculty, updateNonTeachingFaculty, deleteNonTeachingFaculty } from '../controller/nonTeachingFacultyController.js';
import upload from '../middleware/facultyImageUpload.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const nonTeachingFacultyRouter = express.Router();

nonTeachingFacultyRouter.post('/create', authMiddleware, adminMiddleware, upload.single('photo'), createNonTeachingFaculty);
nonTeachingFacultyRouter.get('/all', getAllNonTeachingFaculty);
nonTeachingFacultyRouter.put('/update/:id', authMiddleware, adminMiddleware, upload.single('photo'), updateNonTeachingFaculty);
nonTeachingFacultyRouter.delete('/delete/:id', authMiddleware, adminMiddleware, deleteNonTeachingFaculty);

export default nonTeachingFacultyRouter;
