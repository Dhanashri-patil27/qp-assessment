import { body } from 'express-validator';

export const addOrderItemRules = () => [
    body('items').exists().isArray(),
    body('items.*.itemId').exists().isUUID().not().isEmpty(),
    body('items.*.quantity').exists().isString().not().isEmpty(),
];
