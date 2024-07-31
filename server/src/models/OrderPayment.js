const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('orderPayment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        payment_stripe_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payment_date: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true // <-- ejemplo: Pending no podria existir 2 veces.
        },
        // esta seria la suma total de la compra, ejemplo si el usuario compra 2 templates 
        // diferentes al mismo tiempo, ese total iria aqui.
        total_amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    
    }) 
};

