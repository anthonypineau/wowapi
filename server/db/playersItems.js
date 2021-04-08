const knex = require('./knex');

module.exports = {
    getAll(){
        return knex("playersitems");
    },
    getOne(id){
        return knex("playersitems").where('id', id);
    },
    create(playerItems) {
        return knex("playersitems").insert(playerItems, '*');
    },
    update(id, playerItems) {
        return knex("playersitems").where('id', id).update(playerItems, '*');
    },
    delete(id) {
        return knex("playersitems").where('id', id).del();
    }
}