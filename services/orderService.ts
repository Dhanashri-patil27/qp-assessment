import GroceryItems from '../models/groceryItems'
import Order from '../models/order';
import OrderItem from '../models/orderItems';
import ErrorCodes from '../errors/ErrorCodes';

export async function orderGroceryItems(items: any[], userId: any): Promise<Order> {
    try {
        const order = await Order.create({
            status: 'pending',
            user_id: userId
        });
        if (!items || !Array.isArray(items)) {
            let errorCode = ErrorCodes['200000']
            throw errorCode
        }
        const orderItemsPromises = items.map(async (item: any) => {
            const groceryItem = await GroceryItems.findByPk(item.itemId);
            if (!groceryItem) {
                let errorCode = ErrorCodes['100006']
                throw errorCode
            }
            if (groceryItem.quantity < item.quantity) {
                let errorCode = ErrorCodes['200001']
                errorCode.message = `Insufficient quantity for item with ID ${item.itemId}.`
                throw errorCode
            }
            await groceryItem.update({ quantity: groceryItem.quantity - item.quantity });
            return OrderItem.create({
                order_id: order.id,
                item_id: item.itemId,
                quantity: item.quantity,
            });
        });
        await Promise.all(orderItemsPromises);
        const orderWithItems = await Order.findByPk(order.id, {
            include: [{
                model: OrderItem,
                include: [{
                    model: GroceryItems
                }]
            }],
        })
        return orderWithItems!;
    } catch (error: any) {
        let errorCode = ErrorCodes['200002']
        errorCode.message = error.message;
        throw errorCode;
    }
}
