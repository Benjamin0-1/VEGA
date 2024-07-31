const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('image', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    original: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCover: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    set: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    }
},
{
  timestamps: false
});
};