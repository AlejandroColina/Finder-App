const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Pregunta = sequelize.define('Pregunta', {
        pregunta:{
            type: DataTypes.TEXT,
            allowNull:false
        },
        user:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        respuesta:{
            type: DataTypes.TEXT,
            allowNull:true
        },
        profesional:{
            type:DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        reportado:{
            type: DataTypes.BOOLEAN,
        }
    });

}