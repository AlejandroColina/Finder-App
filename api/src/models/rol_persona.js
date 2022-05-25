const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Rol_persona = sequelize.define('Rol_persona', {
        profesional: {
            type: DataTypes.BOOLEAN
        },
        cliente: {
            type: DataTypes.BOOLEAN
        }
    });

}