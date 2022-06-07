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

        for (let i = 0; i < tipos.length; i++) {
            Profesion.create({
                nombre: tipos[i].profesion,
                logo: tipos[i].logo
            })
        };

        personas.map(async (person, PersonaId) => {
            let promedio = parseInt(person.puntuacion.reduce((a, b) => a + b) / person.puntuacion.length);
            let persona = await Persona.create({
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
            });

            await Publicacion.create({
                descripcion: person.descripcion,
                precio: person.precio,
                PersonaId: PersonaId + 1
            });

            await persona.setProfesions(person.profesion);
        });

        setTimeout(() => {
            personas.map(async (obj, id) => {
                id += 1
                await Direccion.create({
                    PersonaId: id,
                    direccion: obj.direccion,
                    ciudad: obj.ciudad,
                    pais: obj.pais
                });
            })
        }, 1000);
    })