import express from 'express';
import { getChatResponse } from '../controller/chatbotController.js';

const router = express.Router();

router.post('/query', getChatResponse);

export default router;
