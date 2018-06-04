require("dotenv").config();
const restify = require("restify");
const bunyan = require("bunyan");
const mongoose = require("mongoose");
const corsMiddleware = require("restify-cors-middleware");

const routes = require("./routes/");
const Database = require("./database");
const ApiHelper = require("./helpers/api.helper");
const UsersController = require("./controllers/Users.controller");

const log = bunyan.createLogger({name: "101_memes"});
const dtb = new Database(log);
const apiHelper = new ApiHelper();
const globalUsers = {
    admins: [],
    banned: [],
    moderators: []
};

const cors = corsMiddleware({
    origins: ["*"],
    credentials: false,
    headers: [""]
});
const server = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.queryParser({mapParams: true}));
server.use(restify.plugins.bodyParser());
server.use((req, res, next) => {
    if (req.body === undefined) {
        req.body = {};
    }
    next();
});
server.use((req, res, next) => apiHelper.checkToken(req, res, next, log, globalUsers));

let serverInited = false;
function initServer(mongoose) {
    if (serverInited) {
        return false;
    }
    serverInited = true;
    require("./models/schemas/index")(mongoose);
    const users = new UsersController(mongoose);
    return users.updateUsers(globalUsers)
        .then(() => {
            process.stdin.setEncoding("utf8");
            process.stdin.on("data", text => {
                text = text.split(" ");
                if (text[0] === "setUser") {
                    if (text.length !== 3) {
                        return log.error("Usage: setUser login role");
                    }
                    users.insertUser(text[1], text[2].trim(), globalUsers)
                        .then(() => log.info("User list updated: ", globalUsers))
                        .catch(error => log.error(error));
                } else if (text[0] === "deleteUser") {
                    if (text.length !== 2) {
                        return log.error("Usage: deleteUser login");
                    }
                    users.deleteUser(text[1].trim(), globalUsers)
                        .then(() => log.info("User list update: ", globalUsers))
                        .catch(error => log.error(error));
                } else if (text[0].trim() === "listUsers") {
                    if (text.length !== 1) {
                        return log.error("Usage: listUsers");
                    }
                    log.info("", globalUsers);
                }
            });
            routes(server, restify.plugins, log, mongoose, globalUsers);
            log.info("Routes loaded");
        });
}

mongoose.connection.on("connected", () => initServer(mongoose));
server.listen(8080, () => {
    log.info(`Server listening at ${server.url}`);
    dtb.init()
        .catch(error => log.error(error));
});
