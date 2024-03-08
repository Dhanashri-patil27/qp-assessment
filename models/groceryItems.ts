import {
  DataTypes,
  Model,
} from "sequelize";
import sequelize from '../config/db';
import { UUID } from "crypto";

export interface GroceryItemAttributes {
  id: UUID;
  name: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GroceryItemCreationAttributes extends Omit<GroceryItemAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

class GroceryItems extends Model<GroceryItemAttributes, GroceryItemCreationAttributes> implements GroceryItemAttributes {
  public id!: UUID;
  public name!: string;
  public price!: number;
  public quantity!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

}

GroceryItems.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    tableName: 'grocery_items',
    modelName: 'GroceryItems',
    freezeTableName: true,
  }
);


export default GroceryItems;
