const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    employee_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "employee_id",
      references: {
        key: "id",
        model: "employees_profiles_model"
      }
    },
    training_activity_name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "training_activity_name"
    },
    training_event_name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "training_event_name"
    },
    event_from_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "event_from_date"
    },
    event_to_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "event_to_date"
    },
    total_training_hours: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "total_training_hours"
    }
  };
  const options = {
    tableName: "employee_training",
    comment: "",
    indexes: [{
      name: "employee_id_idx",
      unique: false,
      type: "BTREE",
      fields: ["employee_id"]
    }]
  };
  const EmployeeTrainingModel = sequelize.define("employee_training_model", attributes, options);
  return EmployeeTrainingModel;
};