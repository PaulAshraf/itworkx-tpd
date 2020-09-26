const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    skill_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "skill_id"
    },
    skill_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "skill_name",
      unique: "Skill_Name_UNIQUE"
    }
  };
  const options = {
    tableName: "skills",
    comment: "",
    indexes: []
  };
  const SkillsModel = sequelize.define("skills_model", attributes, options);
  return SkillsModel;
};