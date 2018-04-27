const restify = require("restify");
const bunyan = require("bunyan");
const Database = require("./database");
const routes = require("./routes/");

const log = bunyan.createLogger({name: "101_memes"});
const dtb = new Database(log);

const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.listen(8080, () => {
    log.info(`Server listening at ${server.url}`);
    routes(server);
});
dtb.init();
