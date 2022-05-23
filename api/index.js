const server = require('./src/app');
const { DB_CONN } = require('./src/db');

DB_CONN.sync({ force: true })
    .then(() => {
        console.log('============================');
        console.log('Connected to DB')
    })
    .then(() => {
        server.listen(3001, () => {
            console.log('Listening Server of Routes');
            console.log('============================');
        });
    });