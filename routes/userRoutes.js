import express from 'express';
import { createUser, getUsers, updateUser, verifyUser} from '../controllers/userController.js';
import authenticateUser from '../middlewares/auth.js';

const router = express.Router();

router.get('/self',authenticateUser,getUsers);
router.put('/self',authenticateUser,updateUser);
router.post('/',createUser);
router.get('/verify',verifyUser);

export default router;
