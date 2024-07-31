// este modelo actualmente no esta siendo utilizado.
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('favorite', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },

        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        // id del template.
        // la relacion entre Favorite y Product seria many-to-many
        // la relacion entre Favorite y User seria one-to-many (un usuario puede tener muchos favorites).
        product_id: {
            type: DataTypes.UUID,
            allowNull: false
        },

    })
}
