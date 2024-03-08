import express from 'express';
import { login, signUp } from '../services/userService';
import validation from '../middleware/Validator';
import handleErrorAsync from '../middleware/ErrorHandler';
import { loginRules, signUpRules } from '../middleware/validations/users'

const router = express.Router();

router.post('/login', loginRules(), validation, handleErrorAsync(login));
router.post('/signUp', signUpRules(), validation, handleErrorAsync(signUp))

export default router;
