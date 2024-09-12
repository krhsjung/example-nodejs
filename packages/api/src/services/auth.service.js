import { keycloakApis, ResponseType } from 'lib'

class AuthService {
  async exchangeToken({ token, issuer }) {
    const response = await keycloakApis.exchangeToken(token, issuer);

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}, body: ${JSON.stringify(await response.json())}`);
      return ResponseType.FAIL_EXCHANGE_TOKEN;
    }
    
    return {
      ...ResponseType.OK,
      data: await response.json()
    };
  };
}

export default new AuthService();