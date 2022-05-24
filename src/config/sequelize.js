const Sequelize = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize(env.DB_NAME, env.DB_USERNAME, env.DB_PASSWORD, {
    dialect: env.DB_DIALECT,
    host: env.DB_HOST
});

module.exports = sequelize;
