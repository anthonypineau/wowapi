const express = require('express');

const professions = require('../db/professions');

const router = express.Router();

router.get('/', (req, res) => {
    professions.getAll().then(professions => {
        res.json(professions);
    });
});

router.get('/:id', (req, res) => {
    professions.getOne(req.params.id).then(professions => {
        res.json(professions);
    });
});

module.exports = router;