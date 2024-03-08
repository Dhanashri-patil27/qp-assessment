import GroceryItem from "../models/groceryItems";
import OrderItem from "../models/orderItems";
import ErrorCodes from '../errors/ErrorCodes';

export async function addGroceryItem(name: string, price: number, quantity: number): Promise<GroceryItem> {
    try {
        const item = await GroceryItem.findOne({
            where: { name }
        })
        if (item) {
            let errorCode = ErrorCodes['100000']
            throw errorCode
        }
        const newItem = await GroceryItem.create({ name, price, quantity });
        return newItem;
    } catch (error: any) {
        let errorCode = ErrorCodes['100001']
        errorCode.message = error.message;
        throw errorCode
    }
}

export async function viewGroceryItems(): Promise<GroceryItem[]> {
    try {
        return await GroceryItem.findAll();
    } catch (error: any) {
        let errorCode = ErrorCodes['100003']
        errorCode.message = error.message;
        throw errorCode
    }
}

export async function getGroceryItem(itemId: any): Promise<GroceryItem | null> {
    try {
        const item = await GroceryItem.findOne({
            where: {
                id: itemId,
            }
        });
        return item;
    } catch (error: any) {
        let errorCode = ErrorCodes['100003']
        errorCode.message = error.message;
        throw errorCode
    }
}

export async function editGroceryItem(itemId: string, body: any): Promise<GroceryItem | null> {
    try {
        const item = await GroceryItem.findByPk(itemId);
        if (item) {
            await item.update(body);
            return item;
        } else {
            let errorCode = ErrorCodes['100006']
            throw errorCode
        }
    } catch (error: any) {
        let errorCode = ErrorCodes['100002']
        errorCode.message = error.message;
        throw errorCode
    }
}

export async function deleteGroceryItem(itemId: any): Promise<void> {
    try {
        const item = await GroceryItem.findByPk(itemId);
        if (item) {

            await OrderItem.destroy({
                where: {
                    item_id: item.id
                }
            })
            return await item.destroy();
        } else {
            let errorCode = ErrorCodes['100006']
            throw errorCode
        }
    } catch (error: any) {
        let errorCode = ErrorCodes['100004']
        errorCode.message = error.message;
        throw errorCode
    }
}

export async function manageInventory(itemId: string, action: string, amount: number): Promise<{ message: string }> {
    try {
        const groceryItem = await GroceryItem.findByPk(itemId);

        if (!groceryItem) {
            let errorCode = ErrorCodes['100006']
            throw errorCode
        }
        if (action === 'increase') {
            groceryItem.quantity += amount;
        } else if (action === 'decrease') {
            if (groceryItem.quantity < amount) {
                let errorCode = ErrorCodes['100007']
                throw errorCode
            }
            groceryItem.quantity -= amount;
        } else {
            let errorCode = ErrorCodes['100008']
            throw errorCode
        }
        await groceryItem.save();

        return { message: 'Inventory updated successfully' };
    } catch (error: any) {
        let errorCode = ErrorCodes['100005']
        errorCode.message = error.message;
        throw errorCode
    }
}

