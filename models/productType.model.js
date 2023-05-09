module.exports = (sequelize, Sequelize) => {
  const ProductType = sequelize.define("product_types", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      // autoIncrement: true,
      allowNull: false,
    },
    pty_name: {
      type: Sequelize.STRING(50),
      // unique: true,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  return ProductType;
};
