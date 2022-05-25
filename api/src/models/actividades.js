const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Actividades = sequelize.define('Actividades', {
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

}