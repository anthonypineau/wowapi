const express = require('express');

const itemClasses = require('../db/itemClasses');

const router = express.Router();

router.get('/', (req, res) => {
    itemClasses.getAll().then(itemClasses => {
        res.json(itemClasses);
    });
});

router.get('/:id', (req, res) => {
    itemClasses.getOne(req.params.id).then(itemClasses => {
        res.json(itemClasses);
    });
});

module.exports = router;