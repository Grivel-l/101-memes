const fs = require("fs");

module.exports = (server, log) => {
    (function readRoute(dir = __dirname) {
        fs.readdirSync(dir).map(file => {
            if (fs.lstatSync(`${dir}/${file}`).isDirectory()) {
                readRoute(`${dir}/${file}`);
            } else if (file.includes(".route.js")) {
                require(`${dir}/${file}`)(server, log);
            }
        });
    })();
};
