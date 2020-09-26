const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "user_id",
      references: {
        key: "id",
        model: "users_model"
      }
    },
    role_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "role_id",
      references: {
        key: "id",
        model: "role_model"
      }
    }
  };
  const options = {
    tableName: "user_role",
    comment: "",
    indexes: [{
      name: "role_id_fk_idx",
      unique: false,
      type: "BTREE",
      fields: ["role_id"]
    }]
  };
  const UserRoleModel = sequelize.define("user_role_model", attributes, options);
  return UserRoleModel;
};