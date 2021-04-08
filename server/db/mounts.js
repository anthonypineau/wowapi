const knex = require('./knex');

module.exports = {
    getAll(){
        return knex("mounts");
    },
    getOne(id){
        return knex("mounts").where('id', id);
    },
    create(mount) {
        return knex("mounts").insert(mount, '*');
    },
    update(id, mount) {
        return knex("mounts").where('id', id).update(mount, '*');
    },
    delete(id) {
        return knex("mounts").where('id', id).del();
    }
}