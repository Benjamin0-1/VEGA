const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10; // this is the default I chose.

module.exports = (sequelize) => {
  const User = sequelize.define(
    'user',
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
        },
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
        allowNull: true, // for firebase users, this will be null.
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firebaseUid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {  // <-- this is a must. otherwise, it will not work at login time.
            user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
          }
        },
      },
    }
  );

  return User;
};


/**const { DataTypes } = require('sequelize');

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
}; */