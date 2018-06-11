const fs = require("fs");
const mongoose = require("mongoose");

const {unknownError} = require("./helper.migration");
const MigrationsModel = require("../app/models/Migrations.model");
const Database = require("../app/database");
const dtb = new Database();
const baseDir = "./srcs/migrations/";

function printUsage() {
    console.log("Usage: npm run migration:create dirName migrationName");
}

function createFile() {
    const migrationsModel = new MigrationsModel();
    return migrationsModel.getLast()
        .then(migration => {
            const last = migration === null ? 0 :parseInt(migration.name.split("_")[0], 10) + 1;
            try {
                fs.writeFileSync(`${baseDir}${process.argv[2]}/${last}_${process.argv[3]}.migration.js`, `module.exports = {
run: mongoose => new Promise(resolve => resolve()),
rollback: mongoose => new Promise(resolve => resolve())
}
`);
                console.log("Migration successFully created !");
            } catch (error) {
                unknownError(error);
            }
        });
}

if  (process.argv[2] === undefined || process.argv[3] === undefined) {
    printUsage();
    process.exit(0);
}
mongoose.connection.on("connected", () => {
    require("../app/models/schemas/Migrations.schema")(mongoose);
    try {
        fs.accessSync(`${baseDir}${process.argv[2]}`, fs.constants.F_OK);
    } catch (error) {
        if (error.code !== "ENOENT") {
            unknownError(error);
        }
        console.log(`Creating dir ${process.argv[2]}...`);
        try {
            fs.mkdirSync(`${baseDir}${process.argv[2]}`);
        } catch (error) {
            unknownError(error);
        }
    }
    createFile()
        .then(() => process.exit(0))
        .catch(error => unknownError(error));
});
dtb.init()
    .catch(error => {
        unknownError(error);
    });
