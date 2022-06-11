const express = require("express");
const router = express.Router();
const { Persona } = require("../db");
const persona = require("../models/persona");
const nodemailer = require("nodemailer");

// INSTALAR NODEMAILER < npm i nodemailer >
// 1.=> Cuando se crea el usuario, su propiedad VERIFICADO es 'false' por defecto.
// 2.=> Si VERIFICADO está en 'false', se le envía el mail de verificación. VERIFICADO cambia a 'true'.

router.post("/send-email", async (req, res, next) => {
  if (verificado === false) {
    let { email } = req.body;

    // const transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: "isai.donnelly76@ethereal.email",
    //     pass: "Bz2gM3wDPk6xFZxS7r",
    //   },
    // });

    // const mailOptions = {
    //   from: '"Finder" <finder@gmail.com>',
    //   to: email,
    //   subject: "Enviado desde Finder ✔",
    //   html: `<h1> QUE ONDA ${persona.nombres} </h1>`,
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   error
    //     ? res.status(500).send(error.message)
    //     : res.status(200).json(req.body); //cambiar .status por .redirect('/rutaDeInicio')
    // });
  }
});
