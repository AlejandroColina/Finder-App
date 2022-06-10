const server = require('./src/app');
const { DB_CONN } = require('./src/db');
const { Profesion, Persona, Direccion, Publicacion } = require('./src/db');
const tipos = require('./src/routes/infoFake/tipos');
const personas = require('./src/routes/infoFake/data');

DB_CONN.sync({ force: true })
    .then(() => {
        console.log('============================');
        console.log('Connected to DB')
        server.listen(3001, () => {
            console.log('Listening Server of Routes');
            console.log('============================');
        });
    })

    .then(async () => {
        try {
            let ids = 1;
            let consultaBD = await Profesion.findAll();

            if (!consultaBD.length) {

                for (let i = 0; i < tipos.length; i++) {
                    Profesion.create({
                        nombre: tipos[i].profesion,
                        logo: tipos[i].logo
                    })
                };

                let arrayDireccion = [];
                let arrayCiudad = [];
                let arrayPais = [];
                let arrayLongitud = [];
                let arrayLatitud = [];

                personas.map(e => {
                    arrayDireccion.push(e.direccion)
                    arrayCiudad.push(e.ciudad)
                    arrayPais.push(e.pais)
                    arrayLongitud.push(e.longitud)
                    arrayLatitud.push(e.latitud)
                })

                arrayDireccion = new Set(arrayDireccion)
                arrayDireccion = Array.from(arrayDireccion)

                arrayCiudad = new Set(arrayCiudad)
                arrayCiudad = Array.from(arrayCiudad)

                arrayLongitud = new Set(arrayLongitud)
                arrayLongitud = Array.from(arrayLongitud)

                arrayLatitud = new Set(arrayLatitud)
                arrayLatitud = Array.from(arrayLatitud)

                personas.map(async () => {                    
                    if (ids === 14) ids = 1;
                    let index = ids;
                    ids++;

                    await Direccion.create({
                        direccion: arrayDireccion[index - 1],
                        ciudad: arrayCiudad[index - 1],
                        pais: 'Argentina',
                        longitud: arrayLongitud[index - 1],
                        latitud: arrayLatitud[index - 1]
                    });
                })

                personas.map(async (person, index) => {
                    let promedio = parseInt(person.puntuacion.reduce((a, b) => a + b) / person.puntuacion.length);
                    await Persona.create({
                        nombres: person.nombres,
                        apellidos: person.apellidos,
                        documento: person.documento,
                        telefono: person.telefono,
                        email: person.email,
                        edad: person.edad,
                        imagen: person.imagen,
                        favoritos: person.favoritos,
                        promedio: promedio,
                        trabajosPagos: [],
                        genero: person.genero,
                        puntuacion: person.puntuacion,
                        baneado: false,
                        notificaciones: []
                    });

                    if (ids === 14) ids = 1;
                    let DireccionId = ids;
                    ids++;

                    await Publicacion.create({
                        descripcion: person.descripcion,
                        precio: person.precio,
                        titulo: 'Trabajo profesional finder ' + (index + 1),
                        PersonaId: index + 1,
                        DireccionId: DireccionId,
                        ProfesionId: person.profesion,
                    });
                });
            }
        } catch (error) {
            console.log(error)
        }
    })