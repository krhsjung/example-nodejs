import { jwt, keycloakApis, ResponseType } from 'lib'

class AuthService {
  async exchangeToken({ token, issuer }) {
    const response = await keycloakApis.exchangeToken(token, issuer);

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}, body: ${JSON.stringify(await response.json())}`);
      return ResponseType.FAIL_EXCHANGE_TOKEN;
    }

    return {
      ...ResponseType.OK,
      data: this.changeTokenExpire(await response.json()),
    };
  };

  async refreshToken({ refreshToken }) {
    const response = await keycloakApis.refreshToken(refreshToken);

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}, body: ${JSON.stringify(await response.json())}`);
      return ResponseType.FAIL_REFRESH_TOKEN;
    }

    return {
      ...ResponseType.OK,
      data: this.changeTokenExpire(await response.json()),
    };
  };

  changeTokenExpire(token) {
    const decodedToken = jwt.decode(token.access_token);
    token['expires_in'] = decodedToken.exp;

    const decodedRefreshToken = jwt.decode(token.refresh_token);
    token['refresh_expires_in'] = decodedRefreshToken.exp;

    return token;
  }
}

export default new AuthService();