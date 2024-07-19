import T_USER from "../models/T_USER.js"

export class UserRepository {

  findAll = async () => {
    return await T_USER.findAll({ order: [["CREATED_DATE", "DESC"]], });
  };
  findOneById = async (userId) => {
    return await T_USER.findOne({ where: { ID: userId } });
  };

  findOneByLoginId = async (loginId) => {
    return await T_USER.findOne({ where: { LOGIN_ID: loginId } });
  }

  findOneByEmail = async (email) => {
    return await T_USER.findOne({ where: { EMAIL: email } });
  }

  signinUser = async (userId, loginId, userName, nickName, email) => {
    return await T_USER.create({
      ID: userId,
      LOGIN_ID: loginId,
      USER_NAME: userName,
      NICK_NAME: nickName,
      EMAIL: email
    });
  }

  updateUser = async (userId, loginId, userName, nickName, email) => {
    return await T_USER.update({
      LOGIN_ID: loginId,
      USER_NAME: userName,
      NICK_NAME: nickName,
      EMAIL: email,
    }, {
      where: {
        ID: userId
      }
    });
  }

  deleteUser = async (userId) => {
    return await T_USER.destroy({ where: { ID: userId } });
  }
}