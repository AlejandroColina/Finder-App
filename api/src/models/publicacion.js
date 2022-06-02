const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Publicacion = sequelize.define('Publicacion', {
        descripcion: {
            type: DataTypes.STRING
        },
        precio: {
            type: DataTypes.INTEGER
        }
    })
};