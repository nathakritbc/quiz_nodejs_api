require("dotenv").config();
module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  DIALECT: process.env.DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// module.exports = {
//   HOST: "127.0.0.1",
//   USER: "postgres",
//   PASSWORD: "12345678",
//   DB: "node-api-stock",
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };
