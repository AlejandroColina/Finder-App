const express = require('express');
const router = express.Router();
const person = require('./data');
router.use(express.json());

router.get('/', (req, res, next) => {
    try {
        return res.json(person);
    } catch (error) {
        next(error);
    }
});

module.exports = router;