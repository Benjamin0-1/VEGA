const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('order', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        // user to whom the order belongs
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        // product id to be purchased
        // product_id: {
        //     type: DataTypes.UUID,
        //     allowNull: false
        // },
        total_amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        
        order_date: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "fulfilled"
        },
        stripe_session_id: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    });
};
