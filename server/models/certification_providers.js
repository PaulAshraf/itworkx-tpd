const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    certificatoin_provider_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "certificatoin_provider_id"
    },
    certification_provider_name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "certification_provider_name"
    }
  };
  const options = {
    tableName: "certification_providers",
    comment: "",
    indexes: []
  };
  const CertificationProvidersModel = sequelize.define("certification_providers_model", attributes, options);
  return CertificationProvidersModel;
};