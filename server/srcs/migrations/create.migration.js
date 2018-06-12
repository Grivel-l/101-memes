const fs = require("fs");
const mongoose = require("mongoose");

const {unknownError} = require("./helper.migration");
const Database = require("../app/database");
const dtb = new Database();
const baseDir = "./srcs/migrations/";

function printUsage() {
    console.log("Usage: npm run migration:create dirName migrationName");
}

function getNbr(nbr, dir) {
    try {
        fs.readdirSync(dir).map(file => {
            if (!file.includes("migration.js") && fs.statSync(`${dir}/${file}`).isDirectory()) {
                const nbr2 = getNbr(nbr, `${dir}/${file}`);
                if (nbr2 > nbr) {
                    nbr = nbr2;
                }
            } else if (file.includes("migration.js") && dir !== baseDir) {
                if (parseInt(file.split("_")[0], 10) > nbr) {
                    nbr = parseInt(file.split("_")[0], 10);
                }
            }
        });
    } catch (error) {
        unknownError(error);
    }
    return nbr;
}

function createFile() {
    try {
        fs.writeFileSync(`${baseDir}${process.argv[2]}/${getNbr(0, baseDir) + 1}_${process.argv[3]}.migration.js`, `module.exports = {
    run: mongoose => new Promise(resolve => resolve()),
    rollback: mongoose => new Promise(resolve => resolve())
}
`);
        console.log("Migration successFully created !");
    } catch (error) {
        unknownError(error);
    }
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
    createFile();
    process.exit(0);
});
dtb.init()
    .catch(error => {
        unknownError(error);
    });
