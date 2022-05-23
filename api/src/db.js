require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/finder`, {
    logging: false,
    native: false,
    define: {
        timestamps: false
    }
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

modelDefiners.forEach(model => model(sequelize));

const { Person, Profesion } = sequelize.models;

Person.hasMany(Profesion);
Profesion.belongsTo(Person);


module.exports = {
    ...sequelize.models,
    DB_CONN: sequelize
}
