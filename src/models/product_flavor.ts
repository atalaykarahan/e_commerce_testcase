import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import db from "../../db";

interface ProductsFlavorInstance
  extends Model<
    InferAttributes<ProductsFlavorInstance>,
    InferCreationAttributes<ProductsFlavorInstance>
  > {
  product_id: string;
  flavor_id: string;
}

const ProductFlavor = db.define<ProductsFlavorInstance>(
  "product_flavor",
  {
    product_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    flavor_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
  },
  {
    tableName: "PRODUCT_FLAVOR",
    timestamps: false,
  }
);

export default ProductFlavor;
