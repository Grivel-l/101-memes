class MigrationsModel {
    constructor() {
        this.schema = require("mongoose").model("Migrations");
    }

    createMigration(path, name) {
        return this.schema.create({
            name,
            path: `${path}/`,
            executed: false,
            createDate: new Date()
        });
    }

    removeMigration(_id) {
        return this.schema.remove({_id});
    }
}

module.exports = MigrationsModel;
