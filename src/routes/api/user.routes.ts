import express from 'express';
import UserController from '../../controllers/user';

const router = express.Router();

router.get('/', UserController.getAllUser);
router.get('/:id', UserController.getUser);
router.post('/', UserController.createUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
