const mongoose = require("mongoose");
const configs = require("../configs/database");

class Database {
    constructor(log) {
        this.log = log;
        this.looping = true;
        this.connect = this.connect.bind(this);
    }

    connect(res = null) {
        return new Promise(resolve => {
            mongoose.connect(configs.url, configs.options)
                .then(() => {
                    this.looping = false;
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
        mongoose.connection.on("disconnected", () => {
            if (!this.looping) {
                this.log.error("Disconnected from database");
                this.looping = true;
                this.connect();
            }
        });
        return this.connect();
    }
}

module.exports = Database;
