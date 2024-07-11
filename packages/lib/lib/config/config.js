import dotenv from "dotenv";

// .env 파일에서 환경 변수 불러오기.
dotenv.config("../.env");

// Database config
const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DRIVER,
  define: {
    timestamps: false,
  },
};

export default config;
