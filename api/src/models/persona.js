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
        imagen: {
            type: DataTypes.STRING
        },
        descripcion: {
            type: DataTypes.STRING
        },
        puntuacion: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            validate: {
                max: 1,
                min: 5,
            }
        }
    });

}