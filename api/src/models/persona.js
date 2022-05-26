const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Persona = sequelize.define('Persona', {
        nombres: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        apellidos: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        documento: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        telefono: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        edad: {
            type: DataTypes.INTEGER
        },
        descripcion: {
            type: DataTypes.STRING
        },
    });

}