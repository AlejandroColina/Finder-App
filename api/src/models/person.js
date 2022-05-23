const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Person = sequelize.define('Person', {
        nombres: {
            type: DataTypes.STRING(50)
        },
        apellidos: {
            type: DataTypes.STRING(50)
        },
        documento: {
            type: DataTypes.STRING(50)
        },
        telefono: {
            type: DataTypes.STRING(50)
        },
        redes_sociales: {
            type: DataTypes.STRING(50)
        },
        email: {
            type: DataTypes.STRING(50)
        },
        password: {
            type: DataTypes.STRING(50)
        }
    });

}