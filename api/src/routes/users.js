const express = require("express");
const router = express.Router();
const axios = require("axios");
const transporter = require('./transporter');
const { Persona, Profesion, Direccion, Publicacion } = require("../db");
const cors = require('cors');
router.use(cors());
router.use(express.json());

router.get("/", async (req, res, next) => {
  try {


    let personasDB = await Persona.findAll({
      include: [
        { model: Publicacion, include: [Direccion, Profesion] }
      ],
    });
    if (personasDB.length == 0)
      return res.send("LA BASE DE DATOS NO TIENE INFORMACION");

    let objPersonas = personasDB.map((person) => {

      return {
        id: person.id,
        nombres: person.nombres,
        apellidos: person.apellidos,
        documento: person.documento,
        telefono: person.telefono,
        email: person.email,
        edad: person.edad,
        imagen: person.imagen,
        promedio: person.promedio,
        genero: person.genero,
        publicaciones: person.Publicacions,
        favoritos: person.favoritos,
        baneado: person.baneado,
        notificaciones:person.notificaciones
      };
    });

    return res.json(objPersonas);
  } catch (error) {
    next(error);
  }
});

router.get("/ciudades", async (req, res) => {
  let direcciones = await Direccion.findAll();
  let ciudades = direcciones.map(e => e.ciudad)
  ciudades = new Set(ciudades);
  return res.json(Array.from(ciudades));

});

router.get("/empleos", async (req, res, next) => {
  try {
    let consultaDB = await Profesion.findAll();
    let profesiones = consultaDB?.map((e) => e.dataValues.nombre);

    !profesiones.length
      ? res.status(404).send("NO HAY PROFESIONES EN LA BASE DE DATOS.")
      : res.json(profesiones);
  } catch (error) {
    next(error);
  }
});

router.get("/empleosForm", async (req, res, next) => {
  try {
    let consultaDB = await Profesion.findAll();
    let profesiones = consultaDB?.map((e) => e.dataValues);

    !profesiones.length
      ? res.status(404).send("NO HAY PROFESIONES EN LA BASE DE DATOS.")
      : res.json(profesiones);
  } catch (error) {
    next(error);
  }
});

router.get("/trabajo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    axios.get("http://localhost:3001/users").then((respuesta) => {
      let personas = respuesta.data;
      for (let i = 0; i < respuesta.data.length - 1; i++) {
        if (respuesta.data[i].id.toString() === id) res.send(personas[i]);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/crear", async function (req, res) {

  let { ciudad, descripcion, email, multimedia, precio, ProfesionId, titulo } = req.body.toSend;
  if (!ciudad || !descripcion || !email || !precio || !ProfesionId || !titulo) return

  let consulta = await Persona.findOne({
    where: { email: email },
  });

  let PersonaId = consulta?.dataValues.id;

  if (PersonaId) {
    ProfesionId = parseInt(ProfesionId)
    ciudad = parseInt(ciudad)
    await Publicacion.create({
      PersonaId,
      ProfesionId,
      descripcion,
      precio,
      titulo,
      multimedia,
      DireccionId: ciudad,
    });

    return res.send('Publicación creada');
  }
  res.status(404).send('No se pudo publicar');
});

router.post('/nuevo', async (req, res, next) => {
  try {
    const { nombres, email, imagen, apellidos } = req.body;
    let consulta = await Persona.findOne({
      where: {
        email: email
      }
    });

    if (consulta == null) {
      let persona = await Persona.create({
        nombres,
        apellidos,
        email,
        imagen,
        favoritos: [],
        trabajosPagos: [],
        notificaciones:[]
      });

      let message = {
        from: 'Finder Community <finder.app.henry@hotmail.com>',
        to: email,
        subject: 'Ahora eres FINDER ✔',
        html: 
        `<p>
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif"> 
          <head> 
            <meta charset="UTF-8"> 
            <meta content="width=device-width, initial-scale=1" name="viewport"> 
            <meta name="x-apple-disable-message-reformatting"> 
            <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
            <meta content="telephone=no" name="format-detection"> 
            <title>Correo-Finder</title><!--[if (mso 16)]>
              <style type="text/css">
              a {text-decoration: none;}
              </style>
              <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
          <xml>
              <o:OfficeDocumentSettings>
              <o:AllowPNG></o:AllowPNG>
              <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
          </xml>
          <![endif]--> 
            <style type="text/css">
          #outlook a {
            padding:0;
          }
          .es-button {
            mso-style-priority:100!important;
            text-decoration:none!important;
          }
          a[x-apple-data-detectors] {
            color:inherit!important;
            text-decoration:none!important;
            font-size:inherit!important;
            font-family:inherit!important;
            font-weight:inherit!important;
            line-height:inherit!important;
          }
          .es-desk-hidden {
            display:none;
            float:left;
            overflow:hidden;
            width:0;
            max-height:0;
            line-height:0;
            mso-hide:all;
          }
          [data-ogsb] .es-button {
            border-width:0!important;
            padding:10px 30px 10px 30px!important;
          }
          @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } }
          </style> 
          </head> 
          <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
            <div class="es-wrapper-color" style="background-color:#FAFAFA"><!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                  <v:fill type="tile" color="#fafafa"></v:fill>
                </v:background>
              <![endif]--> 
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA"> 
              <tr> 
                <td valign="top" style="padding:0;Margin:0"> 
                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                  <tr> 
                    <td class="es-info-area" align="center" style="padding:0;Margin:0"> 
                    <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF"> 
                      <tr> 
                        <td align="left" style="padding:20px;Margin:0"> 
                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                          <tr> 
                            <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                            <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                              <tr> 
                                <td align="center" style="padding:0;Margin:0;display:none"></td> 
                              </tr> 
                            </table></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table> 
                <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
                  <tr> 
                    <td align="center" style="padding:0;Margin:0"> 
                    <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"> 
                      <tr> 
                        <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px"> 
                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                          <tr> 
                            <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                              <tr> 
                                <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://wonksw.stripocdn.email/content/guids/CABINET_a9bbebca83087a5605b0215041d89595/images/descarga.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="560"></td> 
                              </tr> 
                            </table></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table> 
                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                  <tr> 
                    <td align="center" style="padding:0;Margin:0"> 
                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
                      <tr> 
                        <td align="left" style="Margin:0;padding-top:15px;padding-left:20px;padding-right:20px;padding-bottom:30px"> 
                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                          <tr> 
                            <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                              <tr> 
                                <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:27px;color:#0575e6;font-size:18px"><strong>¡Bienvenido ${nombres} a FINDER!</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:27px;color:#0575e6;font-size:18px"><strong>¡¡Tu Cuenta esta activa!!</strong></p></td> 
                              </tr> 
                            </table></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                      <tr> 
                        <td align="left" style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px"> 
                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                          <tr> 
                            <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                              <tr> 
                                <td align="center" class="es-m-txt-l" style="padding:0;Margin:0;padding-bottom:10px"><h1 style="Margin:0;line-height:55px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style:normal;font-weight:bold;color:#666666">Acerca de Nosotros</h1></td> 
                              </tr> 
                            </table></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                      <tr> 
                        <td align="left" style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:90px" valign="top"><![endif]--> 
                        <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                          <tr> 
                            <td class="es-m-p0r es-m-p20b" align="center" style="padding:0;Margin:0;width:90px"> 
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                              <tr> 
                                <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://wonksw.stripocdn.email/content/guids/CABINET_a9bbebca83087a5605b0215041d89595/images/0a81fed8bc7a4403a2c2173ac5b4c3a2.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="90"></td> 
                              </tr> 
                            </table></td> 
                          </tr> 
                        </table><!--[if mso]></td><td style="width:30px"></td><td style="width:440px" valign="top"><![endif]--> 
                        <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                          <tr> 
                            <td align="center" style="padding:0;Margin:0;width:440px"> 
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                              <tr> 
                                <td align="left" class="es-m-txt-l" style="padding:0;Margin:0;padding-bottom:10px"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#0575e6">Conviertete en EMPRENDEDOR !!</h3></td> 
                              </tr> 
                              <tr> 
                                <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:23px;color:#333333;font-size:15px">Aumenta tu&nbsp;<b>visibilidad</b>&nbsp;en el mercado laboral y ofrece tus servicios de forma&nbsp;<b>rapida</b>&nbsp;y&nbsp;<b>sencilla.</b></p></td> 
                              </tr> 
                            </table></td> 
                          </tr> 
                        </table><!--[if mso]></td></tr></table><![endif]--></td> 
                      </tr> 
                      <tr> 
                        <td align="left" style="padding:20px;Margin:0"><!--[if mso]><table dir="ltr" cellpadding="0"><table dir="rtl" style="width:560px" cellpadding="0" cellspacing="0"><tr><td dir="ltr" style="width:440px" valign="top"><![endif]--> 
                        <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                          <tr> 
                            <td class="es-m-p20b" align="center" style="padding:0;Margin:0;width:90px"> 
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                              <tr> 
                                <td align="center" class="es-m-txt-l" style="padding:0;Margin:0;font-size:0px"><img src="https://wonksw.stripocdn.email/content/guids/CABINET_a9bbebca83087a5605b0215041d89595/images/1121621659974538_hjS.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="90"></td> 
                              </tr> 
                            </table></td> 
                          </tr> 
                        </table><!--[if mso]></td><td dir="ltr" style="width:30px"></td><td dir="ltr" style="width:90px" valign="top"><![endif]--> 
                        <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                          <tr> 
                            <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:440px"> 
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                              <tr> 
                                <td align="left" class="es-m-txt-l" style="padding:0;Margin:0;padding-bottom:10px"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#0575e6">Aumenta tu Experiencia !!</h3></td> 
                              </tr> 
                              <tr> 
                                <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:23px;color:#333333;font-size:15px">Comunidad <b>FINDER</b> te brinda ofertas profesionales y las mejores experiencias</p></td> 
                              </tr> 
                            </table></td> 
                          </tr> 
                        </table><!--[if mso]></td></tr></table></table><![endif]--></td> 
                      </tr> 
                      <tr> 
                        <td align="left" style="padding:20px;Margin:0"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:90px" valign="top"><![endif]--> 
                        <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                          <tr> 
                            <td class="es-m-p0r es-m-p20b" align="center" style="padding:0;Margin:0;width:90px"> 
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                              <tr> 
                                <td align="center" class="es-m-txt-l" style="padding:0;Margin:0;font-size:0px"><img src="https://wonksw.stripocdn.email/content/guids/CABINET_a9bbebca83087a5605b0215041d89595/images/39941621659981630_HGw.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="90"></td> 
                              </tr> 
                            </table></td> 
                          </tr> 
                        </table><!--[if mso]></td><td style="width:30px"></td><td style="width:440px" valign="top"><![endif]--> 
                        <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                          <tr> 
                            <td align="center" style="padding:0;Margin:0;width:440px"> 
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                              <tr> 
                                <td align="left" class="es-m-txt-l" style="padding:0;Margin:0;padding-bottom:10px"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#0575e6">Genera,Compara y Contrata !!</h3></td> 
                              </tr> 
                              <tr> 
                                <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:23px;color:#333333;font-size:15px">Genera empleo contratando <b>EMPRENDEDORES.</b><br>Compara precio calidad y cercanía.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br><br></p></td> 
                              </tr> 
                            </table></td> 
                          </tr> 
                        </table><!--[if mso]></td></tr></table><![endif]--></td> 
                      </tr> 
                      <tr> 
                        <td align="left" style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px"> 
                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                          <tr> 
                            <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                              <tr> 
                                <td align="center" class="es-m-txt-l" style="padding:0;Margin:0"><h2 style="Margin:0;line-height:31px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:26px;font-style:normal;font-weight:bold;color:#0575e6">Crea Tu Perfil !!</h2></td> 
                              </tr> 
                            </table></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                      <tr> 
                        <td class="esdev-adapt-off" align="left" style="Margin:0;padding-bottom:10px;padding-top:15px;padding-left:20px;padding-right:20px"> 
                        <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
                          <tr> 
                            <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                              <tr> 
                                <td align="left" style="padding:0;Margin:0;width:50px"> 
                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                  <tr> 
                                    <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://wonksw.stripocdn.email/content/guids/CABINET_a9bbebca83087a5605b0215041d89595/images/group_43.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="25"></td> 
                                  </tr> 
                                </table></td> 
                              </tr> 
                            </table></td> 
                            <td style="padding:0;Margin:0;width:20px"></td> 
                            <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
                            <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                              <tr> 
                                <td align="left" style="padding:0;Margin:0;width:490px"> 
                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                  <tr> 
                                    <td align="left" style="padding:0;Margin:0;padding-top:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Crea tu perfil de emprendedor registrandote en nuestra app..</p></td> 
                                  </tr> 
                                </table></td> 
                              </tr> 
                            </table></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                      <tr> 
                        <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px"> 
                        <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
                          <tr> 
                            <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                              <tr> 
                                <td align="left" style="padding:0;Margin:0;width:50px"> 
                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                  <tr> 
                                    <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://wonksw.stripocdn.email/content/guids/CABINET_a9bbebca83087a5605b0215041d89595/images/group_43.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="25"></td> 
                                  </tr> 
                                </table></td> 
                              </tr> 
                            </table></td> 
                            <td style="padding:0;Margin:0;width:20px"></td> 
                            <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
                            <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                              <tr> 
                                <td align="left" style="padding:0;Margin:0;width:490px"> 
                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                  <tr> 
                                    <td align="left" style="padding:0;Margin:0;padding-top:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Comparti tus proyectos a traves de fotos y recomendaciones</p></td> 
                                  </tr> 
                                </table></td> 
                              </tr> 
                            </table></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                      <tr> 
                        <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px"> 
                        <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
                          <tr> 
                            <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                              <tr> 
                                <td align="left" style="padding:0;Margin:0;width:50px"> 
                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                  <tr> 
                                    <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://wonksw.stripocdn.email/content/guids/CABINET_a9bbebca83087a5605b0215041d89595/images/group_43.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="25"></td> 
                                  </tr> 
                                </table></td> 
                              </tr> 
                            </table></td> 
                            <td style="padding:0;Margin:0;width:20px"></td> 
                            <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
                            <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                              <tr> 
                                <td align="left" style="padding:0;Margin:0;width:490px"> 
                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                  <tr> 
                                    <td align="left" style="padding:0;Margin:0;padding-top:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Suma puntos con tus trabajos realizados y destacate en lo que&nbsp;gusta hacer !!</p></td> 
                                  </tr> 
                                </table></td> 
                              </tr> 
                            </table></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                      <tr> 
                        <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-bottom:30px"> 
                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                          <tr> 
                            <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                            <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:5px" role="presentation"> 
                              <tr> 
                                <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#5C68E2;border-width:0px;display:inline-block;border-radius:6px;width:auto"><a href="https://finder-app-lime.vercel.app/home" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;border-style:solid;border-color:#5C68E2;border-width:10px 30px 10px 30px;display:inline-block;background:#5C68E2;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;border-left-width:30px;border-right-width:30px">Ir a FINDER</a></span></td> 
                              </tr> 
                            </table></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table> 
                <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
                  <tr> 
                    <td align="center" style="padding:0;Margin:0"> 
                    <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"> 
                      <tr> 
                        <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px"> 
                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                          <tr> 
                            <td align="left" style="padding:0;Margin:0;width:560px"> 
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                              <tr> 
                                <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px"><a href="https://app.websitepolicies.com/policies/questionnaire/privacy-policy" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px">Política de Privacidad</a>&nbsp;-<a href="https://policies.google.com/technologies/cookies?hl=en-US" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px">Política de Cookies<br></a>Finder Agent S.L. - B.A Argentina, Tomo 32.063, Folio 52, Hoja B-201.583, Inscripción 1 NIF B-62084957</p></td> 
                              </tr> 
                            </table></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table> 
                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                  <tr> 
                    <td class="es-info-area" align="center" style="padding:0;Margin:0"> 
                    <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF"> 
                      <tr> 
                        <td align="left" style="padding:20px;Margin:0"> 
                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                          <tr> 
                            <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                              <tr> 
                                <td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a>No longer want to receive these emails?&nbsp;<a href="" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">Unsubscribe</a>.<a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a></p></td> 
                              </tr> 
                            </table></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table></td> 
              </tr> 
            </table> 
            </div>  
          </body>
          </html> 
        </p>`
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log('Error occurred. ' + err.message);
          return process.exit(1);
        }
      });

      return res.json(persona)
    } else {
      return res.json(consulta)
    }

  } catch (error) {
    next(error)
  }
});

router.get('/validar/:email', async (req, res, next) => {
  try {
    const { email } = req.params;

    let consulta = await Persona.findAll({
      where: { email: email }
    });
    if (!consulta.length) return res.status(404).send('No existe usuario con ese email.')
    if (
      consulta[0]?.edad == null ||
      consulta[0]?.apellidos == null ||
      consulta[0]?.documento == null ||
      consulta[0]?.telefono == null

    ) { res.send(true) } else {
      res.send(false);
    }
  } catch (error) {
    next(error)
  }
});

router.patch("/modificar/:email", async (req, res) => {
  const email = req.params.email;
  let { nombres, apellidos, telefono, genero, edad, documento } = req.query;

  if (documento) {
    Persona.update({ documento: req.query.documento }, { where: { email: email } })
  }
  if (apellidos) {
    Persona.update({ apellidos: req.query.apellidos }, { where: { email: email } })
  }
  if (telefono) {
    Persona.update({ telefono: req.query.telefono }, { where: { email: email } })
  }
  if (nombres) {
    Persona.update({ nombres: req.query.nombres }, { where: { email: email } });
  }
  if (genero) {
    Persona.update({ genero: req.query.genero }, { where: { email: email } });
  }
  if (edad) {
    Persona.update({ edad: req.query.edad }, { where: { email: email } });
  }

  const objetivo = await Persona.findOne({ where: { email: email } });
  res.send(objetivo);
});

router.get("/detalle/:idPublicacion", async (req, res, next) => {
  try {
    const { idPublicacion } = req.params;

    let consultaBD = await Publicacion.findByPk(idPublicacion, { include: [Profesion, Direccion] });
    if (consultaBD === null) return res.status(404).send('No existe esta publicación.');

    let idPersona = consultaBD.dataValues.PersonaId;
    let personaPost = await Persona.findAll({
      where: { id: idPersona }
    });

    let obj = {
      idPersona: personaPost[0].dataValues.id,
      nombres: personaPost[0].dataValues.nombres,
      apellidos: personaPost[0].dataValues.apellidos,
      imagen: personaPost[0].dataValues.imagen,
      edad: personaPost[0].dataValues.edad,
      genero: personaPost[0].dataValues.genero,
      puntaje: personaPost[0].dataValues.puntaje,
      documento: personaPost[0].dataValues.documento,
      email: personaPost[0].dataValues.email,
      promedio: personaPost[0].dataValues.promedio,
      telefono: personaPost[0].dataValues.telefono,
      titulo: consultaBD.dataValues.titulo,
      descripcion: consultaBD.dataValues.descripcion,
      precio: consultaBD.dataValues.precio,
      Profesions: consultaBD.dataValues.Profesion.dataValues.nombre,
      logoProfesion: consultaBD.dataValues.Profesion.dataValues.logo,
      direccion: consultaBD.dataValues.Direccion.dataValues.direccion,
      ciudad: consultaBD.dataValues.Direccion.dataValues.ciudad,
      latitud: consultaBD.dataValues.Direccion.dataValues.latitud,
      longitud: consultaBD.dataValues.Direccion.dataValues.longitud,
      pais: consultaBD.dataValues.Direccion.dataValues.pais,
      multimedia: consultaBD?.dataValues?.multimedia

    };

    res.send(obj);

  } catch (error) {
    next(error);
  }
});

router.get("/prof/:id", (req, res) => {
  const id = req.params.id;
  axios.get("http://localhost:3001/users/detalle/" + id)
    .then((respuesta) => {
      let datos = respuesta.data;
      let quiero = datos.Profesions;
      res.send(quiero)
    })
})

router.get('/perfil/:email', async (req, res, next) => {
  try {
    const { email } = req.params;
    let consulta = await Persona.findAll({
      include: [
        { model: Publicacion, include: [Direccion, Profesion] }
      ],
      where: { email: email },
    });

    !consulta.length
      ? res.status(404).send('No existe usuario con este email.')
      : res.json(consulta);

  } catch (error) {
    next(error)
  }
});


router.get("/coincidencias/:id", async (req, res) => {
  const id = req.params.id;
  let respuesta = [];
  try {
    let todo = await axios.get(`http://localhost:3001/users/prof/${id}`)
    let tipo = todo.data;
    let todos = await Persona.findAll({
      include: [
        { model: Publicacion, include: [Direccion, Profesion] }
      ],
    });
    for (let i = 0; i < todos.length; i++) {
      for (let j = 0; j < todos[i].Publicacions.length; j++) {
        if (todos[i].Publicacions[j].Profesion.nombre === tipo) {
          respuesta.push(todos[i])
        }
      }
    }
    res.send(respuesta)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
