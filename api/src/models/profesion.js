const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Profesion = sequelize.define('Profesion', {
        nombres: {
            type: DataTypes.STRING(50)
        }
    });

}