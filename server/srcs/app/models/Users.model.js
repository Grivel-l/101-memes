class UsersModel {
    constructor(mongoose) {
        this.model = mongoose.model("Users");
    }

    getUsers(statement = null, fields = []) {
        return this.model.find(statement === null ? {} : statement, fields);
    }

    insertUser(login, role) {
        return this.getUsers({login})
            .then(users => {
                if (users.length === 0) {
                    return this.model.create({
                        login,
                        role,
                        updateDate: new Date()
                    });
                } else {
                    return this.model.update({login}, {
                        role,
                        updateDate: new Date()
                    }, {runValidators: true});
                }
            });
    }

    deleteUser(login) {
        return this.getUsers({login})
            .then(users => {
                if (users.length === 0) {
                    throw `No user named "${login}"`;
                }
                return this.model.deleteOne({login});
            });
    }
}

module.exports = UsersModel;
