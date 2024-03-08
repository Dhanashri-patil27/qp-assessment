import { body } from 'express-validator';

export const addGroceryItemRules = () => [
    body('name', 'name missing or Invalid Value').exists().isString().not()
        .isEmpty(),
    body('price', 'price missing or Invalid Value').exists().isString().not()
        .isEmpty(),
    body('quantity', 'quantity missing or Invalid Value').exists().isString().not()
        .isEmpty(),
];

export const manageInventoryRules = () => [
    body('action', 'action missing or Invalid Value').exists().isString().not()
        .isEmpty(),
    body('amount', 'amount missing or Invalid Value').exists().isNumeric().not()
        .isEmpty(),
];
