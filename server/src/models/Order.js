const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('order', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        // usuario al cual pertenece la orden
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        // id del template que se va a comprar.
        // product_id: {
        //     type: DataTypes.UUID,
        //     allowNull: false
        // },
        total_amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        // ? esto debe ir ?
        order_date: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "pending"
        },
        stripe_session_id: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    });
};
