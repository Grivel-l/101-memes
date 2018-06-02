const fs = require("fs");

module.exports = (server, plugins, log, dtb, globalUsers) => {
    (function readRoute(dir = __dirname) {
        fs.readdirSync(dir).map(file => {
            if (fs.lstatSync(`${dir}/${file}`).isDirectory()) {
                readRoute(`${dir}/${file}`);
            } else if (file.includes(".route.js")) {
                require(`${dir}/${file}`)(server, plugins, log, dtb, globalUsers);
            }
        });
    })();
};
