const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Persona = sequelize.define("Persona", {
    nombres: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING(50),
      // allowNull: false,
    },
    documento: {
      type: DataTypes.BIGINT,
      // allowNull: false
    },
    telefono: {
      type: DataTypes.BIGINT,
      // allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
    },
    imagen: {
      type: DataTypes.STRING,
    },
    favoritos: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    promedio: {
      type: DataTypes.INTEGER,
    },
    genero: {
      type: DataTypes.STRING,
    },
    trabajosPagos: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    puntuacion: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      validate: {
        max: 5,
        min: 1,
      },
    },
  });
};
