import dotenv from "dotenv";

dotenv.config();

export default {
  DB: process.env.DB,
  PORT: process.env.PORT,
  SALT: process.env.SALT,
  SECRET: process.env.SECRET,
  JWT: process.env.JWT,
};
