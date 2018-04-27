const  restify = require("restify");
const bunyan = require("bunyan");
const Database = new require("./database");
const log = bunyan.createLogger({name: "101_memes"});

const dtb = new Database(log);
const server = restify.createServer();

server.listen(8080, () => log.info(`Server listening at ${server.url}`));
dtb.init();
