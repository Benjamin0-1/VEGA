const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('template', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true 
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    technology: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    timestamps: true, // Enable timestamps to automatically manage createdAt and updatedAt
    paranoid: true, // Enable soft deletion using the paranoid option
  });
};
