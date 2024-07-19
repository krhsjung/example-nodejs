import express from "express";
import { wrapAsyncController, checkValidation, UserValidator } from "lib";
import { userController } from "../../controllers/index.js";

const userRouter = express.Router();

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
userRouter.get("/list", wrapAsyncController(userController.list));

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
userRouter.post("/signup", checkValidation(UserValidator.signup, 'body'), wrapAsyncController(userController.signup));

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
userRouter.get("/:userId", checkValidation(UserValidator.id, 'params'), wrapAsyncController(userController.user));

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
userRouter.put("/update", checkValidation(UserValidator.update, "body"), wrapAsyncController(userController.update));

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
userRouter.delete("/delete", checkValidation(UserValidator.id, "body"), wrapAsyncController(userController.delete));

export default userRouter;