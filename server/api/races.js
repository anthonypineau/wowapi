const express = require('express');

const races = require('../db/races');

const router = express.Router();

router.get('/', (req, res) => {
    races.getAll().then(races => {
        res.json(races);
    });
});

router.get('/:id', (req, res) => {
    races.getOne(req.params.id).then(races => {
        res.json(races);
    });
});

module.exports = router;