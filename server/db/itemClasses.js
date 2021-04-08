const knex = require('./knex');

module.exports = {
    getAll(){
        return knex("itemclasses");
    },
    getOne(id){
        return knex("itemclasses").where('id', id);
    },
    create(itemClass) {
        return knex("itemclasses").insert(itemClass, '*');
    },
    update(id, itemClass) {
        return knex("itemclasses").where('id', id).update(itemClass, '*');
    },
    delete(id) {
        return knex("itemclasses").where('id', id).del();
    }
}