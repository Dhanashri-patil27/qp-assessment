import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import GroceryItems from './groceryItems';
import Order from './order';
import { UUID } from 'crypto';

export interface OrderItemAttributes {
    id: UUID;
    order_id: UUID;
    item_id: UUID;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderItemCreationAttributes extends Omit<OrderItemAttributes, 'id' | 'createdAt' | 'updatedAt'> { }


class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
    public id!: UUID;
    public order_id!: UUID;
    public item_id!: UUID;
    public quantity!: number;
    public createdAt!: Date;
    public updatedAt!: Date;


}

OrderItem.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        order_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Order,
                key: 'id',
            },
        },
        item_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: GroceryItems,
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        tableName: 'order_items',
        modelName: 'OrderItem',
    }
);

GroceryItems.hasMany(OrderItem, { foreignKey: 'item_id' });
OrderItem.belongsTo(GroceryItems, { foreignKey: 'item_id' });
Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
export default OrderItem;