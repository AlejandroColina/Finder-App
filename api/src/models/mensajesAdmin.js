const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const MensajeAdmin = sequelize.define('MensajeAdmin', {
        mensaje: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        source:{
            type: DataTypes.STRING,
            allowNull:false
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false
        },
        read:{
            type: DataTypes.BOOLEAN,
            defaultValue:false,
        },
    },{timestamps:true});
}