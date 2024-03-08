import { Request, Response } from 'express';
import * as groceryItemService from '../services/groceryItemService';
import ApplicationError from '../errors/ApplicationError'

export async function addGroceryItem(req: Request, res: Response) {
    try {
        const { name, price, quantity } = req.body;
        const newItem = await groceryItemService.addGroceryItem(name, price, quantity);
        res.status(201).json(newItem);
    } catch (error: any) {
        throw new ApplicationError(error);
    }
}

export async function getListGroceryItem(req: Request, res: Response) {
    try {
        const newItem = await groceryItemService.viewGroceryItems();
        res.status(201).json(newItem);
    } catch (error: any) {
        throw new ApplicationError(error);
    }
}

export async function getGroceryItem(req: Request, res: Response): Promise<void> {
    try {
        const itemId = req.params.id
        const item = await groceryItemService.getGroceryItem(itemId);
        res.status(200).json(item);
    } catch (error: any) {
        throw new ApplicationError(error);
    }
}

export async function editGroceryItem(req: Request, res: Response) {
    try {
        const itemId = req.params.id;
        const newItem = await groceryItemService.editGroceryItem(itemId, req.body);
        res.status(200).json(newItem);
    } catch (error: any) {
        throw new ApplicationError(error);
    }
}

export async function deleteGroceryItem(req: Request, res: Response) {
    const itemId = req.params.id;
    try {
        const result = await groceryItemService.deleteGroceryItem(itemId);
        res.status(200).json(result);
    } catch (error: any) {
        throw new ApplicationError(error);
    }
}

export async function manageInventory(req: Request, res: Response) {
    const itemId = req.params.id;
    const { action, amount } = req.body;

    try {
        const result = await groceryItemService.manageInventory(itemId, action, amount);
        res.status(200).json(result);
    } catch (error: any) {
        throw new ApplicationError(error);
    }
}

