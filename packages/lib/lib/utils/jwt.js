import jsonWebToken from "jsonwebtoken"

class JWT {
  decode(token) {
    const decoded = jsonWebToken.decode(token);
    return decoded;
  }

  verify(token, secretKey) {
    jsonWebToken.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err);
        return null;
      }
      return decoded;
    });
  }
}

export const jwt = new JWT();