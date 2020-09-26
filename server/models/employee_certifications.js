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
    certification_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "certification_id",
      references: {
        key: "certification_id",
        model: "certifications_model"
      }
    },
    expiration_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "expiration_date"
    }
  };
  const options = {
    tableName: "employee_certifications",
    comment: "",
    indexes: [{
      name: "employee_certification_employee_id_fk_idx",
      unique: false,
      type: "BTREE",
      fields: ["employee_id"]
    }, {
      name: "employee_certification_certification_id_fk_idx",
      unique: false,
      type: "BTREE",
      fields: ["certification_id"]
    }]
  };
  const EmployeeCertificationsModel = sequelize.define("employee_certifications_model", attributes, options);
  return EmployeeCertificationsModel;
};