const Sequelize = require('sequelize');
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/grace_shopper_db',
  {
    logging: false
  }
);

module.exports = conn;
