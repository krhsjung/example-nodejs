import Joi from 'joi';
import j2s from 'joi-to-swagger';
import { UserValidator } from '../validators/index.js';

export default class UserSchema {

  // parameters
  static pathUserId = {
    name: "userId",
    in: "path",
    required: true,
    description: "hsjung service's user ID",
    schema: j2s(Joi.string().guid()).swagger,
  }

  static parameters = {
    pathUserId: this.pathUserId,
  }

  // schemas
  static schemas = {
    UserId: j2s(UserValidator.id).swagger,
    UserSignup: j2s(UserValidator.signup).swagger,
    UserUpdate: j2s(UserValidator.update).swagger,
  }
}