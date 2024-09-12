import { convertJoiToJson, OK } from "./default.response.js"
import UserValidator from '../validators/user.validator.js';

export const UserOkResponse = {
  OK_USER_LIST: {
    ...OK,
    data: [
      convertJoiToJson(UserValidator.userInformation),
    ],
  },
  OK_USER_INFORMAION: {
    ...OK,
    data: convertJoiToJson(UserValidator.userInformation)
  },
}

export const UserErrorResponse = {
  LOGIN_ID_EXISTS: { code: 1000, message: "Login Id exists" },
  EMAIL_EXISTS: { code: 1001, message: "Email exists" },
  NO_USER: { code: 1002, message: "No user" },
}