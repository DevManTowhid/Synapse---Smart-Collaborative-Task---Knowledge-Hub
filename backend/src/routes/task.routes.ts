import { Router } from 'express';
import { LoginUser, registerUser } from '../controllers/auth.controller.js'; 
import { createTask } from '../controllers/task.controller.js';
import { createWorkspace } from '../controllers/workspace.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const taskRoutes = Router();




taskRoutes.post('/create-task', protect , createTask);



export default taskRoutes;