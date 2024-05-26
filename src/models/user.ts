import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import db from "../../db";

interface UserInstance
  extends Model<
    InferAttributes<UserInstance>,
    InferCreationAttributes<UserInstance>
  > {
  user_id: CreationOptional<string>;
  user_name: string;
  user_surname: string | null;
  user_password: string;
  user_email: string;
}

const User = db.define<UserInstance>(
  "user",
  {
    user_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    user_surname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique:true,
    },
  },
  {
    tableName: "USER",
    timestamps: false,
  }
);

export default User;
