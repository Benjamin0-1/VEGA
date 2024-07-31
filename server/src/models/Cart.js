const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('cart', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        total_amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
    });
};
