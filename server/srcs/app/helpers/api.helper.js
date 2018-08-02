const {checkApiToken} = require("../api/token.api");

function isBanned(login, globalUsers) {
    return globalUsers.banned.filter(user => user.login === login).length > 0;
}

class ApiHelper {
    checkToken(req, res, next, log, globalUsers) {
        if (req.route.path.includes("/slack/")) {
            if (req.body.token !== process.env.SLACK_TOKEN) {
                return res.send(418, {});
            } else if (isBanned(req.body.user_name, globalUsers)) {
                return res.send(200, "You are just banned");
            }
            return next();
        }
        if (req.route.name !== "getsrcsimgs" && process.env.NODE_ENV === "production") {
            checkApiToken(req.query.token || req.body.token)
                .then(response => {
                    if (response.status !== 200) {
                        return res.send(response.status, {message: response.error});
                    }
                    req.author = {
                        login: response.login,
                        inPool: response.achievements.filter(ach => ach.id === 150).length === 0
                    };
                    if (isBanned(response.login, globalUsers)) {
                        return res.send(418, {});
                    }
                    next();
                })
                .catch(error => {
                    log.error(error);
                    return res.send(error.status || 400, "An error occured");
                });
        }
        else {
            if (process.env.NODE_ENV === "development") {
                req.author = {
                    login: process.env.LOGIN,
                    inPool: false
                };
            }
            if (globalUsers.banned.filter(user => user.login === req.author).length > 0) {
                return res.send(418, {});
            }
            next();
        }
    }
}

module.exports = ApiHelper;
