import express from 'express';
import * as orderController from '../controller/orderController';
import validation from '../middleware/Validator';
import handleErrorAsync from '../middleware/ErrorHandler';
import { authenticateToken } from '../middleware/authMiddleware';
import { addOrderItemRules } from '../middleware/validations/orders'

const router = express.Router();

router.post('/items', authenticateToken, addOrderItemRules(), validation, handleErrorAsync(orderController.orderGroceryItems));

export default router;
