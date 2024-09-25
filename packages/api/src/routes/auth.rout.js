import express from "express";
import { authController } from "../controllers/index.js";
import { AuthValidator, checkValidation, wrapAsyncController } from "lib";

const authRouter = express.Router();

/**
 *  @swagger
 *  /api/auth/exchange_token:
 *  post:
 *    tags:
 *      - 0. User Authorization APIs
 *    summary: Get the user jwt
 *    description: Get the user jwt to hsjung keycloak service
 *    requestBody:
 *      required: true
 *      content:
 *        application/json;charset=UTF-8:
 *          schema:
 *            $ref: '#components/schemas/ExchangeToken'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#components/schemas/ExchangeToken'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json;charset=UTF-8:
 *            examples:
 *              OK:
 *                $ref: '#components/examples/OK_TOKEN'
 *              FAIL_EXCHANGE_TOKEN:
 *                $ref: '#components/examples/FAIL_EXCHANGE_TOKEN'
 */
authRouter.post("/exchange_token", checkValidation(AuthValidator.exchangeToken, "body"), wrapAsyncController(authController.exchangeToken));



/**
 *  @swagger
 *  /api/auth/refresh_token:
 *  post:
 *    tags:
 *      - 0. User Authorization APIs
 *    summary: Get the user jwt using refresh token
 *    description: Get the user jwt using refresh token to hsjung keycloak service
 *    requestBody:
 *      required: true
 *      content:
 *        application/json;charset=UTF-8:
 *          schema:
 *            $ref: '#components/schemas/RefreshToken'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#components/schemas/RefreshToken'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json;charset=UTF-8:
 *            examples:
 *              OK:
 *                $ref: '#components/examples/OK_TOKEN'
 *              FAIL_REFRESH_TOKEN:
 *                $ref: '#components/examples/FAIL_REFRESH_TOKEN'
 */
authRouter.post("/refresh_token", checkValidation(AuthValidator.refreshToken, "body"), wrapAsyncController(authController.refreshToken));


export default authRouter;