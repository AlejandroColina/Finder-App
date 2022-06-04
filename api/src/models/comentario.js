const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Comentario = sequelize.define('Comentario', {
        puntaje:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comentario:{
            type: DataTypes.TEXT,
            allowNull:false
        },
        persona:{
            type: DataTypes.STRING, //persona que hace el comentario
            allowNull: false
        }
    });

}