import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controller/users.js';

const router = express.Router();

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:id', getUserById);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router