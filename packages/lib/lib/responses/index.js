import { OK } from "./default.response.js"
import { AuthOkResponse, AuthErrorResponse } from "./auth.response.js";
import { UserOkResponse, UserErrorResponse } from "./user.reponse.js";

const OkResponse = {
  OK: OK,
  // Auth OK response
  ...AuthOkResponse,
  // User OK response
  ...UserOkResponse,
}

const ErrorResponse = {
  // Auth error response
  ...AuthErrorResponse,
  // User error response
  ...UserErrorResponse,
}

export const ResponseType = {
  // OK response
  ...OkResponse,

  // Error response
  ...ErrorResponse,
  // Unknown error reponse
  DATA_FORMAT_ERROR: { code: 9998, message: "Validation check error message" },
  // Unknown error reponse
  UNKNOWN_ERROR: { code: 9999, message: "UNKNOWN_ERROR" },
};

export const SwaggerResponseExample = Object.fromEntries(
  Object.keys(ResponseType).map(key => [key, { value: ResponseType[key] }])
);