module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      // field: "id",
      primaryKey: true,
      // autoIncrement: true,
      allowNull: false,
    },
    u_email: {
      type: Sequelize.STRING(50),
      isEmail: true,
      unique: true,
      allowNull: false,
    },
    u_password: {
      type: Sequelize.STRING(),
      allowNull: false,
    },
    u_full_name: {
      type: Sequelize.STRING(),
      allowNull: false,
    },
    u_tel: {
      type: Sequelize.STRING(20),
      unique: true,
    },
    u_address: {
      type: Sequelize.TEXT(),
    },
    u_status: {
      type: Sequelize.BOOLEAN(),
      allowNull: false,
      defaultValue: true,
    },
    u_role: {
      type: Sequelize.ENUM("ADMIN", "USER"),
      defaultValue: "USER",
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  return User;
};
