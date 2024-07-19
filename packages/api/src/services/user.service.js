import { userRepository, ResponseType} from "lib";
import { v4 as uuidv4 } from "uuid";

class UserService {
  async list() {
    return {
      ...ResponseType.OK,
      data: (
        await userRepository.findAll()
      ).map((user) => {
        return {
          userId: user.ID,
          loginId: user.LOGIN_ID,
          userName: user.USER_NAME,
          nickname: user.NICK_NAME,
          email: user.EMAIL
        }
      })
    };
  };

  async signup({ loginId, userName, nickname, email }) {
    const userByLogin = await userRepository.findOneByLoginId(loginId);
    if (userByLogin) {
      return ResponseType.LOGIN_ID_EXISTS;
    }

    const userByEmail = await userRepository.findOneByEmail(email);
    if (userByEmail) {
      return ResponseType.EMAIL_EXISTS;
    }

    await userRepository.signinUser(uuidv4(), loginId, userName, nickname, email);
    return ResponseType.OK;
  }

  async user({ userId }) {
    const userInformaion = await userRepository.findOneById(userId);
    if (!userInformaion) {
      return ResponseType.NO_USER;
    }

    return {
      ...ResponseType.OK,
      data: {
        userId: userInformaion.ID,
        loginId: userInformaion.LOGIN_ID,
        userName: userInformaion.USER_NAME,
        nickname: userInformaion.NICK_NAME,
        email: userInformaion.EMAIL
      }
    };
  }

  async update({ userId, loginId, userName, nickname, email }) {
    const userById = await userRepository.findOneById(userId);
    if (!userById) {
      return ResponseType.NO_USER;
    }

    const userByLogin = await userRepository.findOneByLoginId(loginId);
    if (userByLogin && userByLogin.ID != userId) {
      return ResponseType.LOGIN_ID_EXISTS;
    }

    const userByEmail = await userRepository.findOneByEmail(email);
    if (userByEmail && userByEmail.ID != userId) {
      return ResponseType.EMAIL_EXISTS;
    }

    await userRepository.updateUser(userId, loginId, userName, nickname, email);

    const userInformaion = await userRepository.findOneById(userId);
    return {
      ...ResponseType.OK,
      data: {
        userId: userInformaion.ID,
        loginId: userInformaion.LOGIN_ID,
        userName: userInformaion.USER_NAME,
        nickname: userInformaion.NICK_NAME,
        email: userInformaion.EMAIL
      }
    }
  }

  async delete({ userId }) {
    const userById = await userRepository.findOneById(userId);
    if (!userById) {
      return ResponseType.NO_USER;
    }

    await userRepository.deleteUser(userId);
    return ResponseType.OK;
  }
}

export default new UserService();