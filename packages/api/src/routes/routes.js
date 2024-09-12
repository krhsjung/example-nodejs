import express from "express";
import authRouter from "./auth.rout.js"
import v1Router from "./v1/v1.route.js";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/v1", v1Router);

export default apiRouter;