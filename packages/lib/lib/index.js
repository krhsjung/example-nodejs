import initModels from "./models/init-models.js";
import { Sequelize } from "sequelize";
import config from "./config/config.js";

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

initModels(sequelize);

sequelize
  .sync()
  .then(() => console.log("Successfully connected to the database"))
  .catch((err) => console.error("Error: " + err));

export default function test() {
  return 'Hello from lib';
}

// For database
export * from "./repositories/index.js";

// For swagger
export * from "./schemas/index.js"

// For Util
export * from "./utils/index.js"
export * from "./validators/index.js"


