const mongoose = require("mongoose");
const configs = require("../configs/database");

class Database {
    constructor(log) {
        this.log = log;
        this.connect = this.connect.bind(this);
    }

    setCallbacks() {
        mongoose.connection.on("error", () => {
            setTimeout(this.connect, 5000);
        });
    }

    connect() {
        mongoose.connect(configs.url, configs.options)
            .catch(err => this.log.error(err));
    }

    init() {
        this.setCallbacks();
        this.connect();
    }
}

module.exports = Database;
