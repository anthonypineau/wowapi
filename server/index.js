require('dotenv').config()

const express = require('express');
const app = express();
const volleyball = require('volleyball');

const handler = require('./handler/handler')

const auth = require('./auth/auth')

const user = require('./user');

app.use(volleyball);

app.get('/', (req, res) => {
    res.redirect('/user');
});

function authHandler(req, res, next){
    const a=1;
    if(a==1){
        next();
    }else{
        res.sendStatus(403);
    }
}

app.use('/user', authHandler, user)

app.use(handler.notFound);
app.use(handler.errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:3000`);
})