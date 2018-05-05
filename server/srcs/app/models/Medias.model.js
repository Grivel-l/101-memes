const config = require("../../configs/global");

class MediasModel {
    constructor(dtb) {
        this.model = dtb.model("Medias", new dtb.Schema({
            name: String,
            path: String
        }));
    }

    addFile(name, filepath) {
        return this.model.create({
            name,
            path: `${config.imgsDirPath}${filepath.substr(1)}`
        });
    }

    getAll(page = 1, limit = 20) {
        page -= 1;
        return this.model.find({}, null, {limit, skip: page * limit});
    }
}

module.exports = MediasModel;
