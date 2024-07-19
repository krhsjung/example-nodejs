import Joi from "joi";

export default class UserValidator {
  
  static id = Joi.object({
    userId: Joi.string().guid(),
  });

  static signup = Joi.object({
    loginId: Joi.string().required().default("hsjung"),
    userName: Joi.string().required().default("Heeseok Jung"),
    nickname: Joi.string().required().default("hsjung"),
    email: Joi.string().required().email().default("kr.hs.jung@gmail.com"),
  });

  static update = Joi.object({
    userId: Joi.string().guid(),
    loginId: Joi.string().required().default("hsjung"),
    userName: Joi.string().required().default("Heeseok Jung"),
    nickname: Joi.string().required().default("hsjung"),
    email: Joi.string().required().email().default("kr.hs.jung@gmail.com"),
  });

}