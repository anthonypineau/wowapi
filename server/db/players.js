const knex = require('./knex');

module.exports = {
    getAll(){
        return knex("players");
    },
    getOne(id){
        return knex("players").where('id', id);
    },
    create(player) {
        return knex("players").insert(player, '*');
    },
    update(id, player) {
        return knex("players").where('id', id).update(player, '*');
    },
    delete(id) {
        return knex("players").where('id', id).del();
    }
}