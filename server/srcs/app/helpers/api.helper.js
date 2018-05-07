const {apiEndpoint} = require("../../configs/global");

class ApiHelper {
    checkToken(req, res, next) {
        if (req.route.name !== "getsrcsimgs") {
            next();
        }
        else {
            next();
        }
    }
}

module.exports = ApiHelper;
