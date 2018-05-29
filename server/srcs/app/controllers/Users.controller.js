const UsersModel = require("../models/Users.model");

class UsersController {
    constructor(dtb) {
        this.users = new UsersModel(dtb);
    }

    updateUsers(globalUsers) {
        return this.users.getUsers(null, ["login", "role"])
            .then(users => {
                globalUsers.admins = users.filter(user => user.role === "admin");
                globalUsers.banned = users.filter(user => user.role === "banned");
                globalUsers.moderators = users.filter(user => user.role === "moderators");
            });
    }

    insertUser(login, role, globalUsers) {
        return this.users.insertUser(login, role)
            .then(() => this.updateUsers(globalUsers));
    }
}

module.exports = UsersController;