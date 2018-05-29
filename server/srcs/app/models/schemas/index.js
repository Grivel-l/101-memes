const fs = require("fs");

module.exports = dtb => {
    (function readDir(dir = __dirname) {
        fs.readdirSync(dir).forEach((file) => {
            if (fs.lstatSync(`${dir}/${file}`).isDirectory()) {
                readDir(`${dir}/${file}`);
            } else if (file.includes(".schema.js")) {
                require(`${dir}/${file}`)(dtb);
            }
        });
    }());
};
