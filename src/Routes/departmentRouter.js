import express from 'express';
import { createDepartment, getAllDepartments, updateDepartment, deleteDepartment } from '../controller/departmentController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const departmentRouter = express.Router();

departmentRouter.post('/create', authMiddleware, adminMiddleware, createDepartment);
departmentRouter.get('/all', getAllDepartments);
departmentRouter.put('/update/:id', authMiddleware, adminMiddleware, updateDepartment);
departmentRouter.delete('/delete/:id', authMiddleware, adminMiddleware, deleteDepartment);

export default departmentRouter;
