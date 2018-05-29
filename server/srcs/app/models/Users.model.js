class UsersModel {
    constructor(mongoose) {
        this.model = mongoose.model("Users");
    }

    getUsers(role = null, fields = []) {
        return this.model.find(role === null ? {} : {role}, fields);
    }

    insertUser(login, role) {
        return this.getUsers()
            .then(users => {
                if (users.filter(user => user.login === login).length === 0) {
                    return this.model.create({
                        login,
                        role,
                        updateDate: new Date()
                    });
                } else {
                    return this.model.update({login}, {
                        role,
                        updateDate: new Date()
                    });
                }
            });
    }
}

module.exports = UsersModel;
