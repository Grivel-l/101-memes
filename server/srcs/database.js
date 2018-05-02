const mongoose = require("mongoose");
const configs = require("../configs/database");

class Database {
    constructor(log) {
        this.log = log;
        this.connect = this.connect.bind(this);
    }

    connect(res = null) {
        return new Promise(resolve => {
            mongoose.connect(configs.url, configs.options)
                .then(() => {
                    this.log.info("Connected to database");
                    res === null ? resolve(mongoose) : res(mongoose);
                })
                .catch(err => {
                    this.log.error(err);
                    setTimeout(() => this.connect(resolve), 5000);
                });
        });
    }

    init() {
        return this.connect();
    }
}

module.exports = Database;
