const knex = require('./knex');

module.exports = {
    getAll(){
        return knex("items");
    },
    getOne(id){
        return knex("items").where('id', id);
    },
    create(item) {
        return knex("items").insert(item, '*');
    },
    update(id, item) {
        return knex("items").where('id', id).update(item, '*');
    },
    delete(id) {
        return knex("items").where('id', id).del();
    }
}