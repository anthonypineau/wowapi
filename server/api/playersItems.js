const express = require('express');

const playersItems = require('../db/playersItems');

const router = express.Router();

router.get('/', (req, res) => {
    playersItems.getAll().then(playersItems => {
        res.json(playersItems);
    });
});

router.get('/:id', (req, res) => {
    playersItems.getOne(req.params.id).then(playersItems => {
        res.json(playersItems);
    });
});

module.exports = router;