import { jwt, keycloakApis, ResponseType } from 'lib'

class AuthService {
  async exchangeToken({ token, issuer }) {
    const response = await keycloakApis.exchangeToken(token, issuer);

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}, body: ${JSON.stringify(await response.json())}`);
      return ResponseType.FAIL_EXCHANGE_TOKEN;
    }

    const exchangedToken = await response.json();

    const decodedToken = jwt.decode(exchangedToken.access_token);
    exchangedToken['expires_in'] = decodedToken.exp

    const decodedRefreshToken = jwt.decode(exchangedToken.refresh_token);
    exchangedToken['refresh_expires_in'] = decodedRefreshToken.exp

    console.log(exchangedToken);
    
    return {
      ...ResponseType.OK,
      data: exchangedToken
    };
  };
}

export default new AuthService();