const restify = require("restify");
const bunyan = require("bunyan");
const corsMiddleware = require("restify-cors-middleware");

const routes = require("./routes/");
const Database = require("./database");
const ApiHelper = require("./helpers/api.helper");

const log = bunyan.createLogger({name: "101_memes"});
const dtb = new Database(log);
const apiHelper = new ApiHelper();

const cors = corsMiddleware({
    origins: ["*"],
    credentials: false,
    headers: [""]
});
const server = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.queryParser({mapParams: true}));
server.use(restify.plugins.bodyParser({rejectUnknown: true}));
server.use((req, res, next) => {
    if (req.body === undefined) {
        req.body = {};
    }
    next();
});
server.use((req, res, next) => apiHelper.checkToken(req, res, next, log));
server.listen(8080, () => {
    log.info(`Server listening at ${server.url}`);
    dtb.init()
        .then(mongoose => {
            routes(server, restify.plugins, log, mongoose);
            log.info("Routes loaded");
        })
        .catch(error => log.error(error));
});
