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
    acercade: {
      type: DataTypes.TEXT,
    },
    baneado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    puntuacion: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      validate: {
        max: 5,
        min: 1,
      },
    },
    notificaciones:{
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },
    chats:{
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    prueba:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
    
  });
};
