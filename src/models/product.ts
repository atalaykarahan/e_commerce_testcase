import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import db from "../../db";
import CategoryModel from "./category";
import ProductFlavorModel from "./product_flavor";

interface ProductInstance
  extends Model<
    InferAttributes<ProductInstance>,
    InferCreationAttributes<ProductInstance>
  > {
  product_id: CreationOptional<string>;
  product_title: string;
  product_description: string;
  product_price: number;
  product_stock_quantity: number;
  product_origin: string;
  product_roast_level: string;
  category_id: string;
}

const Product = db.define<ProductInstance>(
  "product",
  {
    product_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    product_title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    product_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    product_price: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    product_stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    product_origin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    product_roast_level: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },

  {
    tableName: "PRODUCT",
    timestamps: false,
  }
);

CategoryModel.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(CategoryModel, { foreignKey: "category_id" });

Product.hasMany(ProductFlavorModel, { foreignKey: "product_id" });
ProductFlavorModel.hasMany(Product, { foreignKey: "product_id" });

export default Product;
