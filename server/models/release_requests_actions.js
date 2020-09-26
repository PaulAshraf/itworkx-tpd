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
      autoIncrement: true,
      comment: null,
      field: "action_id",
      references: {
        key: "reference_number",
        model: "release_requests_model"
      }
    },
    release_request_reference_number: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "release_request_reference_number"
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
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "action_note"
    },
    action_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "action_date"
    },
    action_owner: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "action_owner"
    }
  };
  const options = {
    tableName: "release_requests_actions",
    comment: "",
    indexes: []
  };
  const ReleaseRequestsActionsModel = sequelize.define("release_requests_actions_model", attributes, options);
  return ReleaseRequestsActionsModel;
};