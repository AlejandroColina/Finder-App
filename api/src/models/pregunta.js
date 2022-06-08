const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Pregunta = sequelize.define('Pregunta', {
        pregunta:{
            type: DataTypes.TEXT,
            allowNull:false
        },
        persona:{
            type: DataTypes.STRING, //persona que hace el comentario
            allowNull: false
        },
        respuesta:{
            type: DataTypes.TEXT,
            allowNull:true
        }
    });

}