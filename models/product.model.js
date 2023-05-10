module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      // autoIncrement: true,
      allowNull: false,
    },
    p_name: {
      type: Sequelize.STRING(50),
      // unique: true,
      allowNull: false,
    },
    p_price: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    p_amount: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    p_image: {
      type: Sequelize.STRING(),
      unique: true,
      allowNull: false,
    },
    p_status: {
      type: Sequelize.BOOLEAN(),
      allowNull: true,
      defaultValue: true,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  return Product;
};
