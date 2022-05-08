const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("type", {
    //El id se crea solo debido por las propiedades de sequelize
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
