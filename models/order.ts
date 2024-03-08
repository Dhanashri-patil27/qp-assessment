import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import User from './users';
import { UUID } from 'crypto';

export interface OrderAttributes {
    id: UUID;
    status: string;
    user_id: UUID;
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderCreationAttributes extends Omit<OrderAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public id!: UUID;
    public status!: string;
    public user_id!: UUID;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Order.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
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
        tableName: 'orders',
        modelName: 'Order',
    },
);
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

export default Order;
