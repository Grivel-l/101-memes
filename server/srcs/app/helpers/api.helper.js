const {checkToken} = require("../api/token.api");

class ApiHelper {
    checkToken(req, res, next, log, globalUsers) {
        if (req.route.name !== "getsrcsimgs" && process.env.NODE_ENV === "production") {
            checkToken(req.query.token || req.body.token)
                .then(response => {
                    if (response.status !== 200) {
                        return res.send(response.status, {message: response.error});
                    }
                    req.author = response.login;
                    if (globalUsers.banned.filter(user => user.login === req.author).length > 0) {
                        res.send(418, {});
                    }
                    next();
                })
                .catch(error => {
                    log.error(error);
                    res.send(error.status || 400, "An error occured");
                });
        }
        else {
            if (process.env.NODE_ENV === "development") {
                req.author = process.env.LOGIN;
            }
            if (globalUsers.banned.filter(user => user.login === req.author).length > 0) {
                return res.send(418, {});
            }
            next();
        }
    }
}

module.exports = ApiHelper;
