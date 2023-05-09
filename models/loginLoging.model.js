module.exports = (sequelize, Sequelize) => {
  const LoginLoging = sequelize.define("login_loging", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      // autoIncrement: true,
      allowNull: false,
    },

    ip_description: {
      type: Sequelize.TEXT(),
    },
    status: {
      type: Sequelize.BOOLEAN(),
      defaultValue: true,
    },
    time: {
      type: Sequelize.TIME(),
    },
    date: {
      type: Sequelize.DATEONLY(),
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  return LoginLoging;
};
