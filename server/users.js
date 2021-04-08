const express = require('express');

const knex = require('./db/knex');

const router = express.Router();

//const queries = require('../db/queries');

router.get('/', (req, res) => {
    /*
    knex.select().table("users").then(users => {
        res.json(users);
    });*/
    knex("users").then(users => {
        res.json(users);
    });
});

router.get('/:id', (req, res) => {
    knex("users").where('id', req.params.id).then(users => {
        res.json(users);
    });
});

module.exports = router;