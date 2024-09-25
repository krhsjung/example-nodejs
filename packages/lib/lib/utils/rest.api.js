import fetch from "node-fetch"

const KEYCLOCK_URL = process.env.KEYCLOCK_URL;
const KEYCLOCK_TOKEN_URL = `${KEYCLOCK_URL}/realms/example/protocol/openid-connect/token`

class KeycloakApis {
  async exchangeToken(token, issuer) {
    const params = new URLSearchParams();
    params.append('client_id', process.env.KEYCLOCK_CLIENT_EXCHANGE_TOKEN);
    params.append('grant_type', 'urn:ietf:params:oauth:grant-type:token-exchange');
    params.append('subject_token', token);
    params.append('subject_issuer', issuer);
    params.append('subject_token_type', 'urn:ietf:params:oauth:token-type:id_token');

    const options = {
      method: 'POST',
      body: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    return await fetch(KEYCLOCK_TOKEN_URL, options);
  }

  async refreshToken(refreshToken) {
    const params = new URLSearchParams();
    params.append('client_id', process.env.KEYCLOCK_CLIENT_EXCHANGE_TOKEN);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);

    const options = {
      method: 'POST',
      body: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    return await fetch(KEYCLOCK_TOKEN_URL, options);
  }
};

export const keycloakApis = new KeycloakApis()