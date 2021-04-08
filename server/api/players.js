const express = require('express');

const players = require('../db/players');

const router = express.Router();

router.get('/', (req, res) => {
    players.getAll().then(players => {
        res.json(players);
    });
});

router.get('/:id', (req, res) => {
    players.getOne(req.params.id).then(players => {
        res.json(players);
    });
});

module.exports = router;