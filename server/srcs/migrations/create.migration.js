const fs = require("fs");
const baseDir = "./srcs/migrations/";

function printUsage() {
    console.log("Usage: npm run migration:create dirName migrationName");
}

function unknownError(error) {
    console.log("An unknow error occured", error);
    process.exit(1);
}

function createFile() {
    try {
        const files = fs.readdirSync(`${baseDir}${process.argv[2]}`);
        let last = 0;
        files.map(file => {
            const nbr = parseInt(file.split("_")[0], 10);
            if (nbr > last) {
                last = nbr;
            }
        });
        last += 1;
        fs.writeFileSync(`${baseDir}${process.argv[2]}/${last}_${process.argv[3]}.migration.js`, `exports.up = () => {

};
        
exports.down = () => {
        
};

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
try {
    fs.accessSync(`${baseDir}${process.argv[2]}`, fs.constants.F_OK);
    createFile();
} catch (error) {
    if (error.code !== "ENOENT") {
        unknownError(error);
    }
    console.log(`Creating dir ${process.argv[2]}...`);
    try {
        fs.mkdirSync(`${baseDir}${process.argv[2]}`);
        createFile();
    } catch (error) {
        unknownError(error);
    }
}
