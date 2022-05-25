const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Profesion = sequelize.define('Profesion', {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

    });

}