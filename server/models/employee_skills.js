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
    }
  };
  const options = {
    tableName: "employee_skills",
    comment: "",
    indexes: [{
      name: "Employee_ID_idx",
      unique: false,
      type: "BTREE",
      fields: ["employee_id"]
    }, {
      name: "Skill_ID_idx",
      unique: false,
      type: "BTREE",
      fields: ["skill_id"]
    }]
  };
  const EmployeeSkillsModel = sequelize.define("employee_skills_model", attributes, options);
  return EmployeeSkillsModel;
};