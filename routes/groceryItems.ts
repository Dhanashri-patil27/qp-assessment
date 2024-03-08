import express from 'express';
import * as groceryItemController from '../controller/groceryItemController';
import { authenticateToken, verifyAdmin } from '../middleware/authMiddleware';
import validation from '../middleware/Validator';
import handleErrorAsync from '../middleware/ErrorHandler';
import { addGroceryItemRules, manageInventoryRules } from '../middleware/validations/groceryItems'

const router = express.Router();

router.post('/', authenticateToken, verifyAdmin, addGroceryItemRules(), validation, handleErrorAsync(groceryItemController.addGroceryItem));
router.get('/list', authenticateToken, handleErrorAsync(groceryItemController.getListGroceryItem));
router.get('/:id', authenticateToken, verifyAdmin, handleErrorAsync(groceryItemController.getGroceryItem));
router.put('/:id', authenticateToken, verifyAdmin, handleErrorAsync(groceryItemController.editGroceryItem));
router.delete('/:id', authenticateToken, verifyAdmin, handleErrorAsync(groceryItemController.deleteGroceryItem));
router.patch('/:id/inventory', authenticateToken, verifyAdmin, manageInventoryRules(), validation, handleErrorAsync(groceryItemController.manageInventory));

export default router;
