const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    action_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "action_id"
    },
    resource_request_reference_number: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "resource_request_reference_number",
      references: {
        key: "reference_number",
        model: "resource_requests_model"
      }
    },
    action: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "action"
    },
    action_note: {
      type: DataTypes.STRING(256),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "action_note"
    }
  };
  const options = {
    tableName: "resource_request_actions",
    comment: "",
    indexes: [{
      name: "resource_request_reference_number_fk_idx",
      unique: false,
      type: "BTREE",
      fields: ["resource_request_reference_number"]
    }]
  };
  const ResourceRequestActionsModel = sequelize.define("resource_request_actions_model", attributes, options);
  return ResourceRequestActionsModel;
};