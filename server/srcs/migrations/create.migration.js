const fs = require("fs");
const mongoose = require("mongoose");

const MigrationsModel = require("../app/models/Migrations.model");
const Database = require("../app/database");
const dtb = new Database();
const baseDir = "./srcs/migrations/";

function printUsage() {
    console.log("Usage: npm run migration:create dirName migrationName");
}

function unknownError(error) {
    console.log("An unknow error occured", error);
    process.exit(1);
}

function createFile() {
    const migrationsModel = new MigrationsModel();
    let last = 0;
    try {
        const files = fs.readdirSync(`${baseDir}${process.argv[2]}`);
        files.map(file => {
            const nbr = parseInt(file.split("_")[0], 10);
            if (nbr > last) {
                last = nbr;
            }
        });
    } catch (error) {
        unknownError(error);
    }
    last += 1;
    return migrationsModel.createMigration(process.argv[2], process.argv[3])
        .then(({_id}) => {
            try {
                fs.writeFileSync(`${baseDir}${process.argv[2]}/${last}_${process.argv[3]}.migration.js`, `exports.up = () => {

                };
                        
                exports.down = () => {
                        
                };
                
                `);
                console.log("Migration successFully created !");
            } catch (error) {
                migrationsModel.removeMigration(_id)
                    .then(() => unknownError(error))
                    .catch(err => {
                        console.log("An unknow error occured", err);
                        unknownError(error);
                    });
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
