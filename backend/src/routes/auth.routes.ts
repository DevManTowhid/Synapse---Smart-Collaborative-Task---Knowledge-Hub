import { Router } from 'express';
import { LoginUser, registerUser } from '../controllers/auth.controller.js'; 
import { createTask } from '../controllers/task.controller.js';
import { createWorkspace } from '../controllers/workspace.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const authRoutes = Router();

// POST /api/auth/register
authRoutes.post('/register', registerUser); // 


authRoutes.post('/login', LoginUser );



export default authRoutes;