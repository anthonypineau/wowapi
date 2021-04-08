const knex = require('./knex');

module.exports = {
    getAll(){
        return knex("professions");
    },
    getOne(id){
        return knex("professions").where('id', id);
    },
    create(profession) {
        return knex("professions").insert(profession, '*');
    },
    update(id, profession) {
        return knex("professions").where('id', id).update(profession, '*');
    },
    delete(id) {
        return knex("professions").where('id', id).del();
    }
}