import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _T_USER from  "./T_USER.js";

export default function initModels(sequelize) {
  const T_USER = _T_USER.init(sequelize, DataTypes);


  return {
    T_USER,
  };
}
