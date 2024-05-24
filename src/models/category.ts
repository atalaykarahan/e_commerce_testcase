import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import db from "../../db";

interface CategoryInstance
  extends Model<
    InferAttributes<CategoryInstance>,
    InferCreationAttributes<CategoryInstance>
  > {
  category_id: CreationOptional<string>;
  category_title: string;
}

const Category = db.define<CategoryInstance>(
  "category",
  {
    category_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    category_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "CATEOGORY",
    timestamps: false,
  }
);

export default Category;
