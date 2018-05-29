const schema = require("mongoose").model("Users");

class UsersModel {
    getUsers(role = null, fields = []) {
        return schema.find(role === null ? {} : {role}, fields);
    }
}

module.exports = UsersModel;
