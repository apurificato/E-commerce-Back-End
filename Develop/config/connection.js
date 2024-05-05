require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      // added this password line above
      dialectOptions: {
        decimalNumbers: true,
      },
      password: 'pass',
      secret: 'somesecret'
    });

module.exports = sequelize;
