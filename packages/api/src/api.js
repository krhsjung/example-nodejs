import express from "express";
import morgan from "morgan"
import apiRouter from "./routes/routes.js"

const app = express();
const router = express.Router();
const port = 3000;

// HTTP request logger middleware 추가
app.use(morgan("dev"));

// health 체크
router.get("/", (req, res) => res.sendStatus(200));
router.use("/api", apiRouter);

app.use(router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default function test() {
  return 'Hello from api';
}
