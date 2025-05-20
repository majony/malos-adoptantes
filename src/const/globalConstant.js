require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  HOST: process.env.host,
  DATABASE: process.env.database,
  USER: process.env.user,
  PASSWORD: process.env.password,
  PORTAPP: 4000,
  USERNAME_TOKEN: process.env.USERNAME_TOKEN,
  PASSWORD_TOKEN: process.env.PASSWORD_TOKEN,
  SECRET_KEY: process.env.SECRET_KEY,
};
