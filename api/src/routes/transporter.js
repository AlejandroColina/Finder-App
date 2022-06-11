const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secureConnection: false,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: 'finder.app.henry@hotmail.com', // datos para colocar en .ENV
        pass: 'henry1234567' // datos para colocar en .ENV
    }
});

module.exports = transporter;