const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isAlphanumeric: true,
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firebaseUid: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      // deleted_at <-- soft-deletion <-- esto debe ser protegido para admins a nivel de ruta.
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true, // <-- si es que es: null. entonces se puede filtrar, utilizar middleware, etc.
        defaultValue: null
      },
    },
    { //freezeTableName: true, 
      timestamps: false
    } // freezeTableName: false
  );
};
