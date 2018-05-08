const config = require("../../configs/global");

class MediasModel {
    constructor(dtb) {
        this.model = dtb.model("Medias", new dtb.Schema({
            name: String,
            path: String,
            author: String,
            createDate: Date
        }));
    }

    addFile(name, filepath, author) {
        return this.model.create({
            name,
            author,
            path: `${config.imgsDirPath}${filepath.substr(1)}`,
            createDate: new Date()
        });
    }

    getAll(page = 1, limit = 20) {
        page -= 1;
        return this.model.count()
            .then(total => {
                return this.model.find({}, null, {
                    limit,
                    skip: page * limit
                })
                    .sort({createDate: "desc", })
                    .then(data => ({data, pageNbr: Math.ceil(total / limit)}));
            });
    }
}

module.exports = MediasModel;
