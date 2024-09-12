import fetch from "node-fetch"

const KEYCLOCK_URL = process.env.KEYCLOCK_URL;

class KeycloakApis {
  async exchangeToken(token, issuer) {
    const params = new URLSearchParams();
    params.append('client_id', process.env.KEYCLOCK_CLIENT_EXCHANGE_TOKEN);
    params.append('grant_type', 'urn:ietf:params:oauth:grant-type:token-exchange');
    params.append('subject_token', token);
    params.append('subject_issuer', issuer);
    params.append('subject_token_type', 'urn:ietf:params:oauth:token-type:id_token');

    const exchangeTokenURL = `${KEYCLOCK_URL}/realms/example/protocol/openid-connect/token`

    const options = {
      method: 'POST',
      body: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    
    return await fetch(exchangeTokenURL, options);
  }
};

export const keycloakApis = new KeycloakApis()