const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");
dotenv.config();

const sequelize = new Sequelize(process.env.POSTGRESQL_DB);

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sq: sequelize, testDbConnection };
