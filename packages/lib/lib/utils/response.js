const OK = { code: 0, message: "OK" };
const UserInformation = {
  userId: "string($uuid)",
  loginId: "string",
  userName: "string",
  nickname: "string",
  email: "string($email)",
};

const OkResponse = {
  OK: OK,
  OK_USER_LIST: [
    UserInformation
  ],
  OK_USER_INFORMAION: {
    ...OK,
    data: UserInformation
   },
}

const UserErrorResponse = {
  LOGIN_ID_EXISTS: { code: 1000, message: "Login Id exists" },
  EMAIL_EXISTS: { code: 1001, message: "Email exists" },
  NO_USER: { code: 1002, message: "No user" },
}

export const ResponseType = {
  // OK response
  ...OkResponse,

  // User error response
  ...UserErrorResponse,

  // Unknown error reponse
  DATA_FORMAT_ERROR: { code: 9998, message: "Validation check error message" },
  // Unknown error reponse
  UNKNOWN_ERROR: { code: 9999, message: "UNKNOWN_ERROR" },
};

export const SwaggerResponseExample = Object.fromEntries(
  Object.keys(ResponseType).map(key => [key, { value: ResponseType[key] }])
);