import { Router } from 'express';
import { loginController } from '../controllersauth/login.controller.js';
const router = Router();
router.post('/login', loginController);
export default router;
