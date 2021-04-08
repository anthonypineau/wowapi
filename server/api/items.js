const express = require('express');

const items = require('../db/items');

const router = express.Router();

router.get('/', (req, res) => {
    items.getAll().then(items => {
        res.json(items);
    });
});

router.get('/:id', (req, res) => {
    items.getOne(req.params.id).then(items => {
        res.json(items);
    });
});

module.exports = router;