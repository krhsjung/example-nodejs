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
    EMAIL: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    ]
  });
  }
}
