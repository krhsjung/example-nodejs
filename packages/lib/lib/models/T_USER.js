import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class T_USER extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ID: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    LOGIN_ID: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: "LOGIN_ID_UNIQUE"
    },
    USER_NAME: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    NICK_NAME: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    EMAIL: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "EMAIL_UNIQUE"
    },
    CREATED_DATE: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'T_USER',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "LOGIN_ID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "LOGIN_ID" },
        ]
      },
      {
        name: "EMAIL_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "EMAIL" },
        ]
      },
    ]
  });
  }
}
