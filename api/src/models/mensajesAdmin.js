const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const MensajeAdmin = sequelize.define('MensajeAdmin', {
        mensaje: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false
        }
    });
}