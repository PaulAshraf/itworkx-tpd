const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    certification_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "certification_id"
    },
    certification_provider_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "certification_provider_id",
      references: {
        key: "certificatoin_provider_id",
        model: "certification_providers_model"
      }
    },
    certification_name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "certification_name"
    }
  };
  const options = {
    tableName: "certifications",
    comment: "",
    indexes: [{
      name: "certifications_provider_id_fk_idx",
      unique: false,
      type: "BTREE",
      fields: ["certification_provider_id"]
    }]
  };
  const CertificationsModel = sequelize.define("certifications_model", attributes, options);
  return CertificationsModel;
};