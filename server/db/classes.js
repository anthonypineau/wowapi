const knex = require('./knex');

module.exports = {
    getAll(){
        return knex("classes");
    },
    getOne(id){
        return knex("classes").where('id', id);
    },
    create(classe) {
        return knex("classes").insert(classe, '*');
    },
    update(id, classe) {
        return knex("classes").where('id', id).update(classe, '*');
    },
    delete(id) {
        return knex("classes").where('id', id).del();
    }
}