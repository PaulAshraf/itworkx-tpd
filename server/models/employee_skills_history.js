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
    skill_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "skill_id",
      references: {
        key: "skill_id",
        model: "skills_model"
      }
    },
    experience_level: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "experience_level"
    },
    last_used_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "last_used_date"
    },
    created_on: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_on"
    },
    manager_name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "manager_name"
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "title"
    },
    function: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "function"
    }
  };
  const options = {
    tableName: "employee_skills_history",
    comment: "",
    indexes: [{
      name: "employee_skill_history_employee_id_fk_idx",
      unique: false,
      type: "BTREE",
      fields: ["employee_id"]
    }, {
      name: "employee_skills_history_skill_id_fk_idx",
      unique: false,
      type: "BTREE",
      fields: ["skill_id"]
    }]
  };
  const EmployeeSkillsHistoryModel = sequelize.define("employee_skills_history_model", attributes, options);
  return EmployeeSkillsHistoryModel;
};