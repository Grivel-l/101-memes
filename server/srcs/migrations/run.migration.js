const mongoose = require("mongoose");

const {unknownError} = require("./helper.migration");
const MigrationsModel = require("../app/models/Migrations.model");
const Database = require("../app/database");
const dtb = new Database();

function runMigrations(migrations, migrationsModel) {
    if (migrations.length === 0) {
        console.log("All migrations have been updated");
        process.exit(0);
    }
    require(`./${migrations[0].path}${migrations[0].name}.migration.js`).run(mongoose)
        .then(() => {
            console.log(`Migration with _id: ${migrations[0]._id} and name: ${migrations[0].name} successfully executed`);
            migrationsModel.updateOne(migrations.shift()._id, {executed: true})
                .then(() => runMigrations(migrations, migrationsModel))
                .catch(error => unknownError(error));
        })
        .catch(error => {
            console.log(`Error during execution of migration with _id: ${migrations[0]._id} and name: ${migrations[0].name} occured`, error);
            process.exit(1);
        });
}

mongoose.connection.on("connected", () => {
    try {
        require("../app/models/schemas/index")(mongoose);
    } catch (error) {
        unknownError(error);
    }
    const migrationsModel = new MigrationsModel();
    migrationsModel.getAll()
        .then(migrations => runMigrations(migrations, migrationsModel))
        .catch(error => unknownError(error));
});
dtb.init()
    .catch(error => unknownError(error));
