import express from 'express';
import { getUserProfile, loginUser, registerUser } from '../controllers/AuthController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', authMiddleware, getUserProfile);



export default router;