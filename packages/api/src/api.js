import express from "express";
import morgan from "morgan"
import apiRouter from "./routes/routes.js"
import { swaggerUi, openapiSpecification } from './swagger.js';

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

// HTTP request logger middleware 추가
app.use(morgan("dev"));

// request body를 json 형태로 변환하기 위한 body-parser 적용
app.use(express.json());                          // parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));  // parse application/json

// Swagger 셋업
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.get('/api-docs.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(openapiSpecification);
});

// health 체크
router.get("/", (req, res) => res.sendStatus(200));
router.use("/api", apiRouter);

// Server setup & start
app.use(router);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default function test() {
  return 'Hello from api';
}
