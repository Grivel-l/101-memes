const mongoose = require("mongoose");

const {unknownError} = require("./helper.migration");
const MigrationsModel = require("../app/models/Migrations.model");
const Database = require("../app/database");
const dtb = new Database();

mongoose.connection.on("connected", () => {
    try {
        require("../app/models/schemas/index")(mongoose);
    } catch (error) {
        unknownError(error);
    }
    const migrationsModel = new MigrationsModel();
    migrationsModel.getLast({executed: true})
        .then(migration => {
            if (migration === null) {
                process.exit(0);
            }
            return require(`./${migration.path}${migration.name}.migration.js`).rollback(mongoose)
                .then(() => {
                    return migrationsModel.updateOne(migration._id, {executed: false})
                        .then(() => {
                            console.log(`Migration with _id: ${migration._id} and name: ${migration.name} has successfully been rollbacked`);
                            process.exit(0);
                        });
                });
        })
        .catch(error => unknownError(error));
});
dtb.init()
    .catch(error => {
        unknownError(error);
    });
