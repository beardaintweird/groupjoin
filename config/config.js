module.exports = {
  "production": {
    "username": "",
    "password": process.env.DB_PSWD,
    "database": "groupjoin",
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  },
  "development": {
    "username": "",
    "password": null,
    "database": "groupjoin",
    "host": "localhost",
    "dialect": "postgres"
  }
}
