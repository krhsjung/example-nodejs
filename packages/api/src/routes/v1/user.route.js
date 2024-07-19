import express from "express";
import { ResponseType, UserRepository, UserValidator } from "lib";
import { v4 as uuidv4 } from "uuid";

const userRouter = express.Router();
const userRepository = new UserRepository();

/**
 *  @swagger
 *  /api/v1/user/list:
 *  get:
 *    tags:
 *      - 1. v1 User APIs
 *    summary: Get the user list
 *    description: Get the user list for hsjung service
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json;charset=UTF-8:
 *            examples:
 *              OK:
 *                $ref: '#components/examples/OK_USER_LIST'
 */
userRouter.get("/list", async (req, res) => {
  const users = (
    await userRepository.findAll()
  ).map((user) => {
    return {
      userId: user.ID,
      loginId: user.LOGIN_ID,
      userName: user.USER_NAME,
      nickname: user.NICK_NAME,
      email: user.EMAIL
    }
  });

  res.status(200).json({
    ...ResponseType.OK,
    data: users
  });
});

/**
 *  @swagger
 *  /api/v1/user/signup:
 *  post:
 *    tags:
 *      - 1. v1 User APIs
 *    summary: User sign up
 *    description: User sign up for hsjung service
 *    requestBody:
 *      required: true
 *      content:
 *        application/json;charset=UTF-8:
 *          schema:
 *            $ref: '#components/schemas/UserSignup'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#components/schemas/UserSignup'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json;charset=UTF-8:
 *            examples:
 *              OK:
 *                $ref: '#components/examples/OK'
 *              LOGIN_ID_EXISTS:
 *                $ref: '#components/examples/LOGIN_ID_EXISTS'
 *              EMAIL_EXISTS:
 *                $ref: '#components/examples/EMAIL_EXISTS'
 *              DATA_FORMAT_ERROR:
 *                $ref: '#components/examples/DATA_FORMAT_ERROR'
 */
userRouter.post("/signup", async (req, res) => {

  const result = UserValidator.signup.validate(req.body);
  if (result.error) {
    res.status(200).json({
      ...ResponseType.DATA_FORMAT_ERROR,
      message: result.error
    });
    return;
  }

  const { loginId, userName, nickname, email } = req.body;

  const userByLogin = await userRepository.findOneByLoginId(loginId);
  if (userByLogin) {
    res.status(200).json(ResponseType.LOGIN_ID_EXISTS);
    return;
  }

  const userByEmail = await userRepository.findOneByEmail(email);
  if (userByEmail) {
    res.status(200).json(ResponseType.EMAIL_EXISTS);
    return;
  }
  
  await userRepository.signinUser(uuidv4(), loginId, userName, nickname, email);
  res.status(200).json(ResponseType.OK);
});

/**
 *  @swagger
 *  /api/v1/user/{userId}:
 *  get:
 *    tags:
 *      - 1. v1 User APIs
 *    summary: Get a user informain
 *    description: Get a user informain by ID for hsjung service
 *    parameters:
 *       - $ref: '#components/parameters/pathUserId'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json;charset=UTF-8:
 *            examples:
 *              OK:
 *                $ref: '#components/examples/OK_USER_INFORMAION'
 *              NO_USER:
 *                $ref: '#components/examples/NO_USER'
 *              DATA_FORMAT_ERROR:
 *                $ref: '#components/examples/DATA_FORMAT_ERROR'
 */
userRouter.get("/:userId", async (req, res) => {

  const result = UserValidator.id.validate(req.params);
  if (result.error) {
    res.status(200).json({
      ...ResponseType.DATA_FORMAT_ERROR,
      message: result.error
    });
    return;
  }

  const { userId } = req.params;

  const userInfo = await userRepository.findOneById(userId);
  if (!userInfo) {
    res.status(200).json(ResponseType.NO_USER);
    return;
  }

  res.status(200).json({
    ...ResponseType.OK,
    data: {
      userId: userInfo.ID,
      loginId: userInfo.LOGIN_ID,
      userName: userInfo.USER_NAME,
      nickname: userInfo.NICK_NAME,
      email: userInfo.EMAIL
    }
  });
});

/**
 *  @swagger
 *  /api/v1/user/update:
 *  put:
 *    tags:
 *      - 1. v1 User APIs
 *    summary: Update a user informain
 *    description: Update a user informain by ID for hsjung service
 *    requestBody:
 *      required: true
 *      content:
 *        application/json;charset=UTF-8:
 *          schema:
 *            $ref: '#components/schemas/UserUpdate'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#components/schemas/UserUpdate'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json;charset=UTF-8:
 *            examples:
 *              OK:
 *                $ref: '#components/examples/OK_USER_INFORMAION'
 *              NO_USER:
 *                $ref: '#components/examples/NO_USER'
 *              DATA_FORMAT_ERROR:
 *                $ref: '#components/examples/DATA_FORMAT_ERROR'
 */
userRouter.put("/update", async (req, res) => {

  const result = UserValidator.update.validate(req.body);
  if (result.error) {
    res.status(200).json({
      ...ResponseType.DATA_FORMAT_ERROR,
      message: result.error
    });
    return;
  }

  const { userId, loginId, userName, nickname, email } = req.body;

  const userById = await userRepository.findOneById(userId);
  if (!userById) {
    res.status(200).json(ResponseType.NO_USER);
    return;
  }

  const userByLogin = await userRepository.findOneByLoginId(loginId);
  if (userByLogin && userByLogin.ID != userId) {
    res.status(200).json(ResponseType.LOGIN_ID_EXISTS);
    return;
  }

  const userByEmail = await userRepository.findOneByEmail(email);
  if (userByEmail && userByEmail.ID != userId) {
    res.status(200).json(ResponseType.EMAIL_EXISTS);
    return;
  }

  await userRepository.updateUser(userId, loginId, userName, nickname, email);

  const userInfo = await userRepository.findOneById(userId);
  res.status(200).json({
    ...ResponseType.OK,
    data: {
      userId: userInfo.ID,
      loginId: userInfo.LOGIN_ID,
      userName: userInfo.USER_NAME,
      nickname: userInfo.NICK_NAME,
      email: userInfo.EMAIL
    }
  });
});

/**
 *  @swagger
 *  /api/v1/user/delete:
 *  delete:
 *    tags:
 *      - 1. v1 User APIs
 *    summary: Delete a user
 *    description: Delete a user by ID for hsjung service
 *    requestBody:
 *      required: true
 *      content:
 *        application/json;charset=UTF-8:
 *          schema:
 *            $ref: '#components/schemas/UserId'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#components/schemas/UserId'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json;charset=UTF-8:
 *            examples:
 *              OK:
 *                $ref: '#components/examples/OK'
 *              NO_USER:
 *                $ref: '#components/examples/NO_USER'
 *              DATA_FORMAT_ERROR:
 *                $ref: '#components/examples/DATA_FORMAT_ERROR'
 */
userRouter.delete("/delete", async (req, res) => {

  const result = UserValidator.id.validate(req.body);
  if (result.error) {
    res.status(200).json({
      ...ResponseType.DATA_FORMAT_ERROR,
      message: result.error
    });
    return;
  }

  const { userId } = req.body;

  const userById = await userRepository.findOneById(userId);
  if (!userById) {
    res.status(200).json(ResponseType.NO_USER);
    return;
  }

  await userRepository.deleteUser(userId);
  res.status(200).json(ResponseType.OK);
});

export default userRouter;