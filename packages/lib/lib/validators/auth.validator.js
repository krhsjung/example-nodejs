import Joi from "joi";

export default class AuthValidator {
  static token = Joi.object({
    access_token: Joi.string(),
    expires_in: Joi.number(),
    'not-before-policy': Joi.number(),
    refresh_expires_in: Joi.number(),
    refresh_token: Joi.string(),
    session_state: Joi.string(),
    token_type: Joi.string(),
  });

  static exchangeToken = Joi.object({
    token: Joi.string().required(),
    issuer: Joi.string().required(),
  });

  static refreshToken = Joi.object({
    refreshToken: Joi.string().required(),
  });
}