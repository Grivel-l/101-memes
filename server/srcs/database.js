const mongoose = require("mongoose");
const configs = require("../configs/database");

class Database {
    constructor(log) {
        this.log = log;
        this.connect = this.connect.bind(this);
    }

    connect() {
        return new Promise(resolve => {
            mongoose.connect(configs.url, configs.options)
                .then(() => resolve())
                .catch(err => {
                    this.log.error(err);
                    setTimeout(this.connect, 5000);
                });
        });
    }

    init() {
        return this.connect();
    }
}

module.exports = Database;
