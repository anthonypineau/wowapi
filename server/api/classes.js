const express = require('express');

const classes = require('../db/classes');

const router = express.Router();

router.get('/', (req, res) => {
    classes.getAll().then(classes => {
        res.json(classes);
    });
});

router.get('/:id', (req, res) => {
    classes.getOne(req.params.id).then(classes => {
        res.json(classes);
    });
});

module.exports = router;