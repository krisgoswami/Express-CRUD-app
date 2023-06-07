import express from 'express'
import { getUsers, createUser } from '../controller/users.js';

const router = express.Router();

router.get('/mock_data/', getUsers);

router.post('/', createUser);

// router.get('/:id', getUser);

// router.delete('/:id', deleteUser);

// router.patch('/:id', updateUser);

export default router;