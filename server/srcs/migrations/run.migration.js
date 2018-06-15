const fs = require("fs");
const mongoose = require("mongoose");

const baseDir = "./srcs/migrations";
const {unknownError} = require("./helper.migration");
const MigrationsModel = require("../app/models/Migrations.model");
const Database = require("../app/database");
const dtb = new Database();

function runMigrations(migrations, migrationsModel) {
    if (migrations.length === 0) {
        console.log("All migrations have been updated");
        process.exit(0);
    }
    require(`${migrations[0].path}${migrations[0].name}.migration.js`).run(mongoose)
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

function getToRun(migrations, dir, toRun) {
    try {
        fs.readdirSync(dir).map(file => {
            if (!file.includes("migration.js") && fs.statSync(`${dir}/${file}`).isDirectory()) {
                getToRun(migrations, `${dir}/${file}`, toRun);
            } else if (file.includes("migration.js") && dir !== baseDir) {
                const path = `.${dir.substring(baseDir.length)}/`;
                let migration = {};
                let isIn = true;
                migrations.map(mig => {
                    if (mig.path === path && mig.name === file.split(".")[0]) {
                        if (mig.executed) {
                            isIn = false;
                        } else {
                            migration = {...mig};
                        }
                    }
                });
                if (isIn) {
                    toRun.push(Object.keys(migration).length === 0 ? {path, name: file.split(".")[0]} : migration);
                }
            }
        });
    } catch (error) {
        unknownError(error);
    }
}

mongoose.connection.on("connected", () => {
    try {
        require("../app/models/schemas/index")(mongoose);
    } catch (error) {
        unknownError(error);
    }
    const migrationsModel = new MigrationsModel();
    migrationsModel.getAll()
        .then(migrations => {
            const toRun = [];
            getToRun(migrations, baseDir, toRun);
            return Promise.all(toRun.map(mig => {
                if (Object.keys(mig).length > 2) {
                    return new Promise(resolve => resolve(mig));
                }
                return migrationsModel.createMigration(mig.path, mig.name);
            }))
                .then(toRun => runMigrations(toRun, migrationsModel));
        })
        .catch(error => unknownError(error));
});
dtb.init()
    .catch(error => unknownError(error));
