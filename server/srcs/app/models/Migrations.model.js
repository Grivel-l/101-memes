class MigrationsModel {
    constructor() {
        this.schema = require("mongoose").model("Migrations");
    }

    createMigration(path, name) {
        return this.schema.create({
            name,
            path: `${path}`,
            executed: false,
            createDate: new Date()
        });
    }

    removeMigration(_id) {
        return this.schema.remove({_id});
    }

    getAll() {
        return this.schema.find({}, {}, {
            sort: {name: 1}
        }).lean();
    }

    getLast(condition = {}) {
        return this.schema.findOne(condition, {}, {
            limit: 1,
            sort: {name: -1}
        });
    }

    updateOne(_id, updated) {
        return this.schema.updateOne({_id}, updated);
    }
}

module.exports = MigrationsModel;
