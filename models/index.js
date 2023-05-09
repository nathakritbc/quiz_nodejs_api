const dbConfig = require("../configs/db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  operatorsAliases: false,
  dialectOptions: {
    // ssl: {
    // require: false,
    // rejectUnauthorized: false,
    // },
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle,
//   },
// });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// check the databse connection
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

db.login_loging = require("./loginLoging.model")(sequelize, Sequelize);
db.shops = require("./shop.model")(sequelize, Sequelize);
db.product_types = require("./productType.model")(sequelize, Sequelize);
db.products = require("./product.model")(sequelize, Sequelize);
db.users = require("./user.model")(sequelize, Sequelize);

// setting table relationship
db.product_types.hasMany(db.products);
db.products.belongsTo(db.product_types);

db.shops.hasMany(db.products);
db.products.belongsTo(db.shops);

db.users.hasMany(db.login_loging);
db.login_loging.belongsTo(db.users);

module.exports = db;
