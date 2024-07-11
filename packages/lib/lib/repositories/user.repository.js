import T_USER from "../models/T_USER.js"

export class UserRepository {
  findById = async (userId) => {
    return await T_USER.findOne({ where: { ID: userId } });
  };
}