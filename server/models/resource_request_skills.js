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
      autoIncrement: true,
      comment: null,
      field: "skill_id",
      references: {
        key: "skill_id",
        model: "skills_model"
      }
    },
    request_reference_number: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "request_reference_number",
      references: {
        key: "reference_number",
        model: "resource_requests_model"
      }
    },
    category: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "category"
    },
    subcategory: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subcategory"
    }
  };
  const options = {
    tableName: "resource_request_skills",
    comment: "",
    indexes: [{
      name: "skill_id_fk_idx",
      unique: false,
      type: "BTREE",
      fields: ["skill_id"]
    }, {
      name: "resource_request_skills_reference_number_fk_idx",
      unique: false,
      type: "BTREE",
      fields: ["request_reference_number"]
    }]
  };
  const ResourceRequestSkillsModel = sequelize.define("resource_request_skills_model", attributes, options);
  return ResourceRequestSkillsModel;
};