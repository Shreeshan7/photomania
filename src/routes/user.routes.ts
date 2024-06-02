import { Router } from 'express';
import { register, login, getUsers } from '../controller/user.controller';


const router = Router();

router.get('/',getUsers);
router.post('/register', register);
router.post('/login', login);

export default router;