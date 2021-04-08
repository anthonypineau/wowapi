const express = require('express');

const mounts = require('../db/mounts');

const router = express.Router();

router.get('/', (req, res) => {
    mounts.getAll().then(mounts => {
        res.json(mounts);
    });
});

router.get('/:id', (req, res) => {
    mounts.getOne(req.params.id).then(mounts => {
        res.json(mounts);
    });
});

module.exports = router;