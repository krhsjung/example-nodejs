import express from "express";
import { UserRepository } from "lib";

const userRouter = express.Router();
const userRepository = new UserRepository();

userRouter.get("/:userId", async (req, res) => {
  const userInfo = await userRepository.findById(req.params.userId);
  console.log("id는 " + JSON.stringify(userInfo) + " 입니다");
  res.send(`User 정보는 ${JSON.stringify(userInfo, null, 2)} 입니다`);
});

export default userRouter;