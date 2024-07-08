import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("This is user router!");
});

export default userRouter;