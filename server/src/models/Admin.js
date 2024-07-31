const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('admin', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
    })

};
