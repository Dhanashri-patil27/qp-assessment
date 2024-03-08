import { Request, Response } from 'express';
import * as orderService from '../services/orderService';
import ApplicationError from '../errors/ApplicationError'

export async function orderGroceryItems(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        const items = await orderService.orderGroceryItems(req.body.items, userId);
        res.json(items);
    } catch (error: any) {
        throw new ApplicationError(error);
    }
}

