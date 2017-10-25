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
    "password": process.env.BAW_PSWD,
    "database": "groupjoin",
    "host": "localhost",
    "dialect": "postgres"
  }
}
