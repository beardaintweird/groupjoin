const dotenv = require('dotenv').config();

module.exports = {
  "production": {
    "username": "beardaintweird",
    "password": process.env.DB_PSWD,
    "database": "groupjoin",
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  },
  "development": {
    "username": "beardaintweird",
    "password": process.env.ROLE_PSWD,
    "database": "groupjoin",
    "host": "localhost",
    "dialect": "postgres"
  }
}
