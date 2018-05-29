const {checkToken} = require("../api/token.api");

class ApiHelper {
    checkToken(req, res, next, log) {
        if (req.route.name !== "getsrcsimgs" && process.env.NODE_ENV === "production") {
            checkToken(req.query.token || req.body.token)
                .then(response => {
                    if (response.status !== 200) {
                        return res.send(response.status, {message: response.error});
                    }
                    req.author = response.login;
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
            next();
        }
    }
}

module.exports = ApiHelper;
