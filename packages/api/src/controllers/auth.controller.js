import { authService } from "../services/index.js";

class AuthController {
  async exchangeToken(req, res) {
    const response = await authService.exchangeToken(req.requestData);
    res.status(200).json(response);
  };

  async refreshToken(req, res) {
    const response = await authService.refreshToken(req.requestData);
    res.status(200).json(response);
  };
}

export default new AuthController();