const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('reportedTemplate', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },

        template_id: {
            type: DataTypes.UUID,
            allowNull: false
        },

        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },

        reason: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: 'este template no me gusta para nada y es por eso que lo reporto'
        },
    })
};

