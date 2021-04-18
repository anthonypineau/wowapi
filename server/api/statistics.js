const express = require('express');

const classes = require('../db/statistics');

const router = express.Router();

router.get('/', (req, res) => {
    classes.getPlayerWhoHasMostItemInInventory().then(players => {
        res.json(players);
    });
});

module.exports = router;