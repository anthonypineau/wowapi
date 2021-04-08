const knex = require('./knex');

module.exports = {
    getAll(){
        return knex("races");
    },
    getOne(id){
        return knex("races").where('id', id);
    },
    create(race) {
        return knex("races").insert(race, '*');
    },
    update(id, race) {
        return knex("races").where('id', id).update(race, '*');
    },
    delete(id) {
        return knex("races").where('id', id).del();
    }
}