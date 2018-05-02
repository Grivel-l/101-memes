const restify = require("restify");
const bunyan = require("bunyan");
const routes = require("./routes/");
const Database = require("./database");

const log = bunyan.createLogger({name: "101_memes"});
const dtb = new Database(log);

const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.listen(8080, () => {
    log.info(`Server listening at ${server.url}`);
    dtb.init()
        .then(mongoose => {
            routes(server, restify.plugins, log, mongoose);
            log.info("Routes loaded");
        })
        .catch(error => log.error(error));
});
