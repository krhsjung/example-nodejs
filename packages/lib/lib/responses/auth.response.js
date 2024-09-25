import { convertJoiToJson, OK } from "./default.response.js"
import AuthValidator from "../validators/auth.validator.js";

export const AuthOkResponse = {
  OK_TOKEN: {
    ...OK,
    data: convertJoiToJson(AuthValidator.token),
  },
}

export const AuthErrorResponse = {
  FAIL_EXCHANGE_TOKEN: { code: 9001, message: "Fail exchange token" },
  FAIL_REFRESH_TOKEN: { code: 9002, message: "Fail refresh token" },
}