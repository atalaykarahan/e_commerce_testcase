import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import db from "../../db";
import ProductModel from "./product";

interface FlavorInstance
  extends Model<
    InferAttributes<FlavorInstance>,
    InferCreationAttributes<FlavorInstance>
  > {
  flavor_id: CreationOptional<string>;
  note: string;
}

const Flavor = db.define<FlavorInstance>(
  "category",
  {
    flavor_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "FLAVOR",
    timestamps: false,
  }
);

ProductModel.belongsToMany(Flavor, {
  through: "PRODUCT_FLAVOR",
  as: "flavors",
  foreignKey: "product_id",
});

Flavor.belongsToMany(ProductModel, {
  through: "PRODUCT_FLAVOR",
  as: "flavors",
  foreignKey: "flavor_id",
});

export default Flavor;