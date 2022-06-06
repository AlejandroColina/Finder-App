const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Publicacion = sequelize.define('Publicacion', {
        descripcion: {
            type: DataTypes.TEXT
        },
        precio: {
            type: DataTypes.INTEGER
        },
        titulo: {
            type: DataTypes.STRING
        },
        multimedia: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
        
    })
};