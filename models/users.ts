import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import { UUID } from 'crypto';

export interface UserAttributes {
    id: UUID;
    username: string;
    password: string;
    role: 'admin' | 'user';
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: UUID;
    public username!: string;
    public password!: string;
    public role!: 'admin' | 'user';
    public createdAt!: Date;
    public updatedAt!: Date;

}

User.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            defaultValue: 'user',
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
        modelName: 'User',
        tableName: 'users',
    }
);


export default User;
