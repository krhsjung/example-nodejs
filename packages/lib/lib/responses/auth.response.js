import { convertJoiToJson, OK } from "./default.response.js"
import AuthValidator from "../validators/auth.validator.js";

export const AuthOkResponse = {
  OK_EXCHANGE_TOKEN: {
    ...OK,
    data: convertJoiToJson(AuthValidator.exchangedToken),
  },
}

export const AuthErrorResponse = {
  FAIL_EXCHANGE_TOKEN: { code: 9001, message: "Fail exchange token" },
}