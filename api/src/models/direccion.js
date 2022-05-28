const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Direccion = sequelize.define('Direccion', {
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ciudad: {
            type: DataTypes.STRING,
        },
        pais: {
            type: DataTypes.STRING,
        }
    });

}