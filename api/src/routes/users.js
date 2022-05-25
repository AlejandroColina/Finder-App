const express = require('express');
const router = express.Router();
const person = require('./data');
router.use(express.json());
const app = require("express").Router();

router.get('/', (req, res, next) => {
    try {
        return res.json(person);
    } catch (error) {
        next(error);
    }
});

router.get("/:name", (req,res) =>{

})

module.exports = router;