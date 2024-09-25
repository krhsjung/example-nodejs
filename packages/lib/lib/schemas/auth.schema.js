import j2s from 'joi-to-swagger';
import { AuthValidator } from '../validators/index.js';

export default class AuthSchema {

  // schemas
  static schemas = {
    ExchangeToken: j2s(AuthValidator.exchangeToken).swagger,
    RefreshToken: j2s(AuthValidator.refreshToken).swagger,
  }
}