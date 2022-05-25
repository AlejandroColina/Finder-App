const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Direccion = sequelize.define('Direccion', {
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ciudad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pais: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

}