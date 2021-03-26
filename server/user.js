const express = require('express');

const knex = require('./db/knex');

const router = express.Router();

//const queries = require('../db/queries');

router.get('/', (req, res) => {
    knex.select().table("user").then(users => {
        res.json(users);
    });
});

module.exports = router;