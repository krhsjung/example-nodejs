import express from "express";
import userRouter from "./user.route.js";
import { sendMessage } from "lib";

const v1Router = express.Router();

v1Router.use("/user", userRouter);

v1Router.post("/test_push_message", async (req, res) => {
  const { token } = req.body;
  const title = "Test"
  const body = "Test message"
  const message = {
    token: token,
    notification: { title: title, body: body },
    apns: {
      headers: {
        "apns-priority": '5',
      },
      payload: {
        aps: {
          sound: "default",
          "content-available": 1,
        }
      }
    },
    android: {
      priority: "high",
      notification: { title: title, body: body, sound: 'default' }
    },
    data: {
    },
  }
  sendMessage(message);

  res.status(200).json({
    code: 0, message: "OK"
  });
});

export default v1Router;
