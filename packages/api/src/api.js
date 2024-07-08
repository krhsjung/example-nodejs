import express from "express";
import apiRouter from "./routes/routes.js"

const app = express();
const port = 3000;

// health 체크
app.get("/", (req, res) => res.sendStatus(200));

app.use("/api", apiRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default function test() {
  return 'Hello from api';
}
