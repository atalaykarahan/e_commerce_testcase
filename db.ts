import { Sequelize } from "sequelize";



const db = new Sequelize("postgres://postgres:951753@localhost:5432/e_commerce_testcase", {
  dialectOptions: { supportBigNumbers: true },
});

export default db;