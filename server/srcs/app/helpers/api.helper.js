const {checkToken} = require("../api/token.api");

class ApiHelper {
    checkToken(req, res, next, log) {
        if (req.route.name !== "getsrcsimgs") {
            checkToken(req.query.token || (req.body !== undefined && req.body.token))
                .then(response => {
                    if (response.status !== 200) {
                        return res.send(response.status, {message: response.error});
                    }
                    req.author = response.login;
                    next();
                })
                .catch(error => {
                    log.error(error);
                    res.send(400, "An error occured");
                });
        }
        else {
            next();
        }
    }
}

module.exports = ApiHelper;
