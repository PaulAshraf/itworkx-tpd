const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    assignment_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "assignment_id"
    },
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
    workgroup: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "workgroup"
    },
    cost_center: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "cost_center"
    },
    sdm_reporting_manager: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "sdm_reporting_manager"
    },
    allocation_percentage: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "allocation_percentage"
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "start_date"
    },
    release_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "release_date"
    }
  };
  const options = {
    tableName: "assignment",
    comment: "",
    indexes: [{
      name: "assignment_employee_id_fk_idx",
      unique: false,
      type: "BTREE",
      fields: ["employee_id"]
    }]
  };
  const AssignmentModel = sequelize.define("assignment_model", attributes, options);
  return AssignmentModel;
};