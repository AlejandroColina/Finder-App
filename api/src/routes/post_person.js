const express = require('express');
const router = express.Router();
router.use(express.json());

//localhost:30001/person
router.post('/', async (req, res, next) => {
    const { nombres, apellidos, documento, telefono, email, edad, domicilio,  fotos, profesion, } = req.body;
});

module.exports = router;