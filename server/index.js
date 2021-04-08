require('dotenv').config()

const express = require('express');
const app = express();
const volleyball = require('volleyball');

const handler = require('./handler/handler')
const auth = require('./auth/auth')

const users = require('./users');
const classes = require('./api/classes');
const itemClasses = require('./api/itemClasses');
const items = require('./api/items');
const mounts = require('./api/mounts');
const players = require('./api/players');
const playersItems = require('./api/playersItems');
const professions = require('./api/professions');
const races = require('./api/races');

app.use(volleyball);

app.get('/', (req, res) => {
    //res.sendStatus(403);
    res.json(
        {
            "message": "home page"
        }
    );
});

function authHandler(req, res, next){
    const a=1;
    console.log(req.headers);
    if(a==1){
        next();
    }else{
        res.sendStatus(403);
    }
}

app.use(authHandler);

app.use('/classes', classes);
app.use('/itemClasses', itemClasses);
app.use('/items', items);
app.use('/mounts', mounts);
app.use('/players', players);
app.use('/playersItems', playersItems);
app.use('/professions', professions);
app.use('/races', races);
app.use('/users', users);

app.use(handler.notFound);
app.use(handler.errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:3000`);
})