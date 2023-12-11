const { DataTypes } = require("sequelize");
const User = require("./User");
const { sq } = require("../config/database");

const Link = sq.define(
  "link",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accessCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lastAccessedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    // Other model options go here
    tableName: "links",
    timestamps: false,
  }
);

Link.belongsTo(User, { foreignKey: 'userId' });

Link.sync().then(() => {
    console.log("Link Model synced");
  });

module.exports = Link;