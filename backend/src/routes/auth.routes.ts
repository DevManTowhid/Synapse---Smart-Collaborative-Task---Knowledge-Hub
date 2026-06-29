import { Router } from 'express';
import { LoginUser, registerUser } from '../controllers/auth.controller.js'; 

const router = Router();

// POST /api/auth/register
router.post('/register', registerUser); // 
router.post('/login', LoginUser )
export default router;