import { userService } from '../services/index.js';

class UserController {
  async list(req, res) {
    const response = await userService.list();
    res.status(200).json(response);
  };

  async signup(req, res) {
    const response = await userService.signup(req.requestData);
    res.status(200).json(response);
  }

  async user(req, res) {
    const response = await userService.user(req.requestData);
    res.status(200).json(response);
  }

  async update(req, res) {
    const response = await userService.update(req.requestData);
    res.status(200).json(response);
  }

  async delete(req, res) {
    const response = await userService.delete(req.requestData);
    res.status(200).json(response);
  }
}

export default new UserController();
